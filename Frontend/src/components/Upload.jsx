import React, { useState } from 'react';
import { Upload, FileVideo, ChevronRight, RefreshCcw } from 'lucide-react';
import MeetingSummary from './MeetingSummary';

const UploadMeeting = () => {
  const [file, setFile] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [summary, setSummary] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.includes('video')) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (selectedFile && selectedFile.type.includes('video')) {
      setFile(selectedFile);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setProcessingStatus('processing');
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('http://127.0.0.1:5000/api/summarize', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
        setProcessingStatus('complete');
      } else {
        setProcessingStatus('error');
        console.error('Error processing meeting:', data.error);
      }
    } catch (error) {
      console.error('Error processing meeting:', error);
      setProcessingStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">Meeting Summarizer</h1>
          <p className="text-gray-400">Upload your video meeting and get an intelligent summary</p>
        </div>

        {/* Upload Section */}
        <div
          className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-blue-500/50 hover:border-blue-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            {file ? (
              <>
                <FileVideo className="w-16 h-16 text-blue-400" />
                <p className="text-gray-300">{file.name}</p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-blue-400" />
                <p className="text-gray-300">Drag and drop a video file or click to upload</p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>

        {/* Processing Steps */}
        <div className="bg-gray-800 rounded-lg p-6">
          {/* ... (existing processing steps code) ... */}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleProcess}
            disabled={!file || processingStatus !== 'idle'}
            className={`px-8 py-4 rounded-lg flex items-center space-x-2 text-white font-medium transition-colors ${
              processingStatus !== 'idle'
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {processingStatus === 'processing' ? (
              <>
                <RefreshCcw className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Start Processing</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Meeting Summary */}
      <MeetingSummary summary={summary} processingStatus={processingStatus} />
    </div>
  );
};

export default UploadMeeting;