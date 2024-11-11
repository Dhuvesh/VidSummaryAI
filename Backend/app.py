from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import moviepy.editor as mp
import torch
import numpy as np
import librosa
from transformers import WhisperProcessor, WhisperForConditionalGeneration, pipeline

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def extract_audio(video_path, audio_path):
    """
    Extract audio from a video file
    
    Args:
        video_path (str): Path to the input video file
        audio_path (str): Path where the extracted audio will be saved
    
    Returns:
        bool: True if successful, False otherwise
    """
    try:
        video = mp.VideoFileClip(video_path)
        audio = video.audio
        audio.write_audiofile(audio_path)
        video.close()
        audio.close()
        return True
    except Exception as e:
        print(f"Error extracting audio: {str(e)}")
        return False

def transcribe_audio(audio_path):
    """Transcribe audio using Whisper model"""
    try:
        # Load audio with librosa
        print("Loading audio file...")
        audio_data, sample_rate = librosa.load(
            audio_path, 
            sr=16000,
            mono=True
        )
        
        # Convert to float32 numpy array
        audio_data = np.float32(audio_data)
        
        print("Initializing Whisper model...")
        processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
        model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
        
        device = "cuda" if torch.cuda.is_available() else "cpu"
        model = model.to(device)
        
        chunk_length = 30 * sample_rate
        transcription_parts = []
        
        total_chunks = len(range(0, len(audio_data), chunk_length))
        print(f"Total chunks to process: {total_chunks}")
        
        for i in range(0, len(audio_data), chunk_length):
            chunk = audio_data[i:i + chunk_length]
            
            if len(chunk) < sample_rate:
                continue
                
            print(f"Processing chunk {(i//chunk_length) + 1}/{total_chunks}...")
            input_features = processor(
                chunk, 
                sampling_rate=sample_rate,
                return_tensors="pt"
            ).input_features
            
            input_features = input_features.to(device)
            
            with torch.no_grad():
                predicted_ids = model.generate(input_features)
                chunk_transcription = processor.batch_decode(
                    predicted_ids,
                    skip_special_tokens=True
                )[0]
                transcription_parts.append(chunk_transcription)
                print(f"Chunk {(i//chunk_length) + 1} transcribed: {chunk_transcription[:100]}...")
            
            if device == "cuda":
                torch.cuda.empty_cache()
        
        final_transcription = " ".join(transcription_parts)
        print("Transcription completed.")
        return final_transcription
        
    except Exception as e:
        print(f"Error transcribing audio: {e}")
        return None

def summarize_text(text):
    """Summarize transcribed text in pointwise format"""
    try:
        print("Initializing summarization model...")
        summarizer = pipeline(
            "summarization",
            model="facebook/bart-large-cnn",
            device=-1
        )
        
        max_chunk_length = 500
        words = text.split()
        chunks = []
        current_chunk = []
        current_length = 0
        
        for word in words:
            current_length += len(word) + 1
            if current_length > max_chunk_length:
                chunks.append(" ".join(current_chunk))
                current_chunk = [word]
                current_length = len(word)
            else:
                current_chunk.append(word)
        
        if current_chunk:
            chunks.append(" ".join(current_chunk))
        
        total_chunks = len(chunks)
        print(f"Text split into {total_chunks} chunks for summarization")
        
        summaries = []
        for i, chunk in enumerate(chunks, 1):
            print(f"Summarizing chunk {i}/{total_chunks}...")
            if len(chunk.strip()) > 50:
                summary = summarizer(
                    chunk,
                    max_length=150,
                    min_length=30,
                    do_sample=False
                )[0]["summary_text"]
                summaries.append(summary)
                print(f"Chunk {i} summarized successfully")
        
        pointwise_summary = "\n".join([f"- {summary}" for summary in summaries])
        print("Summarization completed in pointwise format.")
        
        with open("meeting_summary_points.txt", "w", encoding="utf-8") as f:
            f.write("Meeting Summary (Pointwise):\n")
            f.write("===========================\n")
            f.write(pointwise_summary)
        
        return pointwise_summary
    except Exception as e:
        print(f"Error summarizing text: {e}")
        return None

@app.route('/api/summarize', methods=['POST'])
def summarize():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and file.filename.endswith('.mp4'):
        try:
            # Save the uploaded file
            filename = secure_filename(file.filename)
            video_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(video_path)
            
            # Process the video
            audio_path = os.path.join(UPLOAD_FOLDER, 'audio.wav')
            
            try:
                print("\nStep 1: Extracting audio from video...")
                if not extract_audio(video_path, audio_path):
                    return jsonify({'error': 'Failed to extract audio'}), 500

                print("\nStep 2: Transcribing audio...")
                transcription = transcribe_audio(audio_path)
                if transcription is None:
                    return jsonify({'error': 'Failed to transcribe audio'}), 500

                print("\nStep 3: Generating summary...")
                summary = summarize_text(transcription)
                if summary is None:
                    return jsonify({'error': 'Failed to generate summary'}), 500

                return jsonify({'summary': summary})
            
            finally:
                # Clean up temporary files
                if os.path.exists(video_path):
                    os.remove(video_path)
                if os.path.exists(audio_path):
                    os.remove(audio_path)
                    
        except Exception as e:
            return jsonify({'error': f'Error processing video: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Invalid file type. Only MP4 videos are allowed.'}), 400

if __name__ == '__main__':
    app.run(debug=True)