# import os
# from moviepy.editor import VideoFileClip
# import torch
# import numpy as np
# import soundfile as sf
# from transformers import pipeline, WhisperProcessor, WhisperForConditionalGeneration
# import librosa

# def extract_audio(video_path, audio_path):
#     """Extract audio from video file"""
#     try:
#         video = VideoFileClip(video_path)
#         video.audio.write_audiofile(audio_path, fps=16000)
#         print("Audio extracted successfully.")
#         video.close()  # Properly close the video file
#         return True
#     except Exception as e:
#         print(f"Error extracting audio: {e}")
#         return False

# def transcribe_audio(audio_path):
#     """Transcribe audio using Whisper model"""
#     try:
#         # Load audio with librosa
#         print("Loading audio file...")
#         audio_data, sample_rate = librosa.load(
#             audio_path, 
#             sr=16000,  # Whisper expects 16kHz
#             mono=True
#         )
        
#         # Convert to float32 numpy array
#         audio_data = np.float32(audio_data)
        
#         print("Initializing Whisper model...")
#         processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
#         model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
        
#         # Move model to GPU if available
#         device = "cuda" if torch.cuda.is_available() else "cpu"
#         model = model.to(device)
        
#         # Process audio in chunks
#         chunk_length = 30 * sample_rate  # 30 seconds chunks
#         transcription_parts = []
        
#         total_chunks = len(range(0, len(audio_data), chunk_length))
#         print(f"Total chunks to process: {total_chunks}")
        
#         for i in range(0, len(audio_data), chunk_length):
#             chunk = audio_data[i:i + chunk_length]
            
#             # Ensure chunk is long enough
#             if len(chunk) < sample_rate:  # Skip if less than 1 second
#                 continue
                
#             print(f"Processing chunk {(i//chunk_length) + 1}/{total_chunks}...")
#             input_features = processor(
#                 chunk, 
#                 sampling_rate=sample_rate,
#                 return_tensors="pt"
#             ).input_features
            
#             # Move input to same device as model
#             input_features = input_features.to(device)
            
#             # Generate transcription for chunk
#             with torch.no_grad():
#                 predicted_ids = model.generate(input_features)
#                 chunk_transcription = processor.batch_decode(
#                     predicted_ids,
#                     skip_special_tokens=True
#                 )[0]
#                 transcription_parts.append(chunk_transcription)
#                 print(f"Chunk {(i//chunk_length) + 1} transcribed: {chunk_transcription[:100]}...")
            
#             # Clear GPU memory if using CUDA
#             if device == "cuda":
#                 torch.cuda.empty_cache()
        
#         # Combine all chunks
#         final_transcription = " ".join(transcription_parts)
#         print("Transcription completed.")
#         return final_transcription
        
#     except Exception as e:
#         print(f"Error transcribing audio: {e}")
#         return None

# def summarize_text(text):
#     """Summarize transcribed text in pointwise format"""
#     try:
#         print("Initializing summarization model...")
#         summarizer = pipeline(
#             "summarization",
#             model="facebook/bart-large-cnn",
#             device=-1  # Force CPU usage for stability
#         )
        
#         # Handle long text by chunking
#         max_chunk_length = 500  # Reduced chunk size for better stability
#         words = text.split()
#         chunks = []
#         current_chunk = []
#         current_length = 0
        
#         for word in words:
#             current_length += len(word) + 1
#             if current_length > max_chunk_length:
#                 chunks.append(" ".join(current_chunk))
#                 current_chunk = [word]
#                 current_length = len(word)
#             else:
#                 current_chunk.append(word)
        
#         if current_chunk:
#             chunks.append(" ".join(current_chunk))
        
#         total_chunks = len(chunks)
#         print(f"Text split into {total_chunks} chunks for summarization")
        
#         summaries = []
#         for i, chunk in enumerate(chunks, 1):
#             print(f"Summarizing chunk {i}/{total_chunks}...")
#             if len(chunk.strip()) > 50:  # Only summarize chunks with substantial content
#                 summary = summarizer(
#                     chunk,
#                     max_length=150,
#                     min_length=30,
#                     do_sample=False
#                 )[0]["summary_text"]
#                 summaries.append(summary)
#                 print(f"Chunk {i} summarized successfully")
        
#         # Format summary into points
#         pointwise_summary = "\n".join([f"- {summary}" for summary in summaries])
#         print("Summarization completed in pointwise format.")
        
#         # Save to a new file in pointwise format
#         with open("meeting_summary_points.txt", "w", encoding="utf-8") as f:
#             f.write("Meeting Summary (Pointwise):\n")
#             f.write("===========================\n")
#             f.write(pointwise_summary)
        
#         return pointwise_summary
#     except Exception as e:
#         print(f"Error summarizing text: {e}")
#         return None

# def main():
#     """Main function to run the meeting summarizer"""
#     # Configuration
#     video_path = r"C:\Users\Dhuvesh\Desktop\MeetingAI\Backend\MeetingAI\video2.mp4"
#   # Change this to your video file name
#     audio_path = "audio.wav"
    
#     # Check if video exists
#     if not os.path.exists(video_path):
#         print(f"Error: Video file '{video_path}' not found.")
#         return
    
#     try:
#         # Step 1: Extract audio
#         print("\nStep 1: Extracting audio from video...")
#         if not extract_audio(video_path, audio_path):
#             return
        
#         # Step 2: Transcribe
#         print("\nStep 2: Transcribing audio...")
#         transcription = transcribe_audio(audio_path)
#         if transcription is None:
#             print("Error: Transcription failed.")
#             return
            
#         print("\nTranscription Result:")
#         print("===================")
#         print(transcription)
#         print("===================\n")
        
#         # Step 3: Summarize
#         print("\nStep 3: Generating summary...")
#         summary = summarize_text(transcription)
#         if summary is None:
#             print("Error: Summarization failed.")
#             return
            
#         print("\nFinal Summary (Pointwise):")
#         print("===========================")
#         print(summary)
#         print("===========================\n")
        
#         # Save the transcription in a separate file
#         with open("meeting_transcription.txt", "w", encoding="utf-8") as f:
#             f.write("Meeting Transcription:\n")
#             f.write("====================\n")
#             f.write(transcription)
        
#         print("Results have been saved to 'meeting_transcription.txt' and 'meeting_summary_points.txt'")
    
#     except Exception as e:
#         print(f"An unexpected error occurred: {e}")
    
#     finally:
#         # Cleanup
#         if os.path.exists(audio_path):
#             try:
#                 os.remove(audio_path)
#                 print("\nTemporary audio file cleaned up.")
#             except Exception as e:
#                 print(f"Error removing temporary audio file: {e}")

# if __name__ == "__main__":
#     print("Meeting Summarizer Starting...")
#     print("============================")
#     main()
#     print("\nProcess completed.")