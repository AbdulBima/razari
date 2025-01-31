"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentEmergencyRecords = () => {
  interface Record {
    time: string;
    type: string;
    severity: string;
 
  }

  const [records, setRecords] = useState<{ records: Record[] } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const submitterId = localStorage.getItem("sttx");
    if (submitterId) {
      fetchData(submitterId);
    } else {
      setError('Submitter ID not found');
      setLoading(false);
    }
  }, []);

  const fetchData = async (submitterId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/emergencies/get-recent/${submitterId}`);
      setRecords(response.data);
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to fetch emergency records');
      setLoading(false);
    }
  };

  // Helper function to format the time string
  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="poppins-regular max-w-full sm:max-w-6xl mx-auto px-8 py-4">
      <h2 className="text-sm  text-[#ff8552] mb-4 sm:mb-5">Recent Emergency Records</h2>
      <table className="w-full text-sm text-gray-700 bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-[#356966] text-white uppercase text-xs sm:text-sm tracking-wider">
            <th className="py-2 px-3 sm:px-4 text-left">Time</th>
            <th className="py-2 px-3 sm:px-4 text-left">Type</th>
            <th className="py-2 px-3 sm:px-4 text-left">Severity</th>
          </tr>
        </thead>
        <tbody>
          {records?.records?.map((record: Record, index: number) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200 ease-in-out"
            >
              <td className="px-3 sm:px-4 py-3">{formatTime(record.time)}</td>
              <td className="px-3 sm:px-4 py-3">{record.type}</td>
              <td className="px-3 sm:px-4 py-3">{record.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEmergencyRecords;
