import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Tag,
  ChevronDown
} from 'lucide-react';
import DashboardNavbar from './DashboardNAvbar';

const Dashboard = () => {
  const [filterDate, setFilterDate] = useState('');
  const [filterParticipants, setFilterParticipants] = useState('');
  const [filterTags, setFilterTags] = useState('');

  const meetings = [
    {
      id: 1,
      date: '2023-08-15',
      duration: '1h 15m',
      participants: ['John Doe', 'Jane Smith', 'Bob Johnson'],
      tags: ['project-a', 'marketing'],
      summary: 'Discussed quarterly goals and assigned action items',
      actionItems: [
        'Follow up with marketing team on campaign strategy',
        'Prepare financial report for next meeting'
      ]
    },
    // Add more sample meeting data
  ];

  return (
    <>
    <DashboardNavbar />
    <div className="w-full h-screen  bg-gray-900 text-white p-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Meeting Dashboard</h1>
      </div>
      <div className="mb-8 grid grid-cols-4 gap-6">
        <div>
          <label htmlFor="date-filter" className="block mb-2 text-gray-400 font-medium">
            Filter by Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="text-gray-500" />
            </div>
            <input
              id="date-filter"
              type="text"
              className="bg-gray-800 border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="participants-filter" className="block mb-2 text-gray-400 font-medium">
            Filter by Participants
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-500" />
            </div>
            <input
              id="participants-filter"
              type="text"
              className="bg-gray-800 border-gray-700 text-white rounded-lg pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by participants"
              value={filterParticipants}
              onChange={(e) => setFilterParticipants(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="tags-filter" className="block mb-2 text-gray-400 font-medium">
            Filter by Tags
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Tag className="text-gray-500" />
            </div>
            <select
              id="tags-filter"
              className="bg-gray-800 border-gray-700 text-white rounded-lg pl-12 pr-8 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              value={filterTags}
              onChange={(e) => setFilterTags(e.target.value)}
            >
              <option value="">All</option>
              <option value="project-a">Project A</option>
              <option value="marketing">Marketing</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <ChevronDown className="text-gray-500" />
            </div>
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Duration</th>
              <th className="px-6 py-4 text-left">Participants</th>
              <th className="px-6 py-4 text-left">Tags</th>
              <th className="px-6 py-4 text-left">Summary</th>
              <th className="px-6 py-4 text-left">Action Items</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr 
                key={meeting.id} 
                className={`border-b border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}
              >
                <td className="px-6 py-4">{meeting.date}</td>
                <td className="px-6 py-4">{meeting.duration}</td>
                <td className="px-6 py-4">
                  {meeting.participants.map((participant, index) => (
                    <span key={index} className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-900 mr-2">
                      {participant}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {meeting.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-500 rounded-full px-3 py-1 text-xs font-semibold text-gray-900 mr-2"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">{meeting.summary}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc pl-4">
                    {meeting.actionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Dashboard;