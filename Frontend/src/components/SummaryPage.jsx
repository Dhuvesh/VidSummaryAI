import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileVideo, Clock, Clipboard } from 'lucide-react';

const SummaryPage = () => {
  const location = useLocation();
  const { summary, duration, wordCount } = location.state;

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>
            <FileVideo className="w-8 h-8 mr-2 inline-block text-blue-400" />
            Meeting Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clipboard className="w-5 h-5" />
              <span>{wordCount} words</span>
            </div>
          </div>
          <div className="prose text-gray-300">
            <p>{summary}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryPage;