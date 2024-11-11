import React from 'react';

const MeetingSummary = ({ summary, processingStatus }) => {
  return (
    <div className="mt-8">
      {processingStatus === 'complete' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-white font-medium mb-4">Meeting Summary</h2>
          <div className="whitespace-pre-wrap text-gray-400">{summary}</div>
        </div>
      )}
      {processingStatus === 'error' && (
        <div className="bg-red-500/10 rounded-lg p-6 text-red-500">
          <h2 className="font-medium mb-2">Error Processing Meeting</h2>
          <p>There was an error processing the meeting. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default MeetingSummary;