"use client";

import React from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FaUserMd as FaDoctor, FaStethoscope, FaUserAlt } from "react-icons/fa";

// Define the valid categories
type Category = "Diagnosis" | "Birth" | "Admission" | "Emergency" | "Death";

// Define the structure for data
type DataPoint = {
  time: string;  // Month label (Jan-Dec)
  category: Category;
  count: number;
};

const Dashboard = () => {
  // Define category data with months as labels (Jan-Dec), with more variation
  const categoryData: Record<Category, DataPoint[]> = {
    Diagnosis: [
      { time: "Jan", category: "Diagnosis", count: 28 },
      { time: "Feb", category: "Diagnosis", count: 37 },
      { time: "Mar", category: "Diagnosis", count: 45 },
      { time: "Apr", category: "Diagnosis", count: 53 },
      { time: "May", category: "Diagnosis", count: 64 },
      { time: "Jun", category: "Diagnosis", count: 72 },
      { time: "Jul", category: "Diagnosis", count: 80 },
      { time: "Aug", category: "Diagnosis", count: 91 },
      { time: "Sep", category: "Diagnosis", count: 100 },
      { time: "Oct", category: "Diagnosis", count: 108 },
      { time: "Nov", category: "Diagnosis", count: 115 },
      { time: "Dec", category: "Diagnosis", count: 130 },
    ],
    Birth: [
      { time: "Jan", category: "Birth", count: 22 },
      { time: "Feb", category: "Birth", count: 19 },
      { time: "Mar", category: "Birth", count: 24 },
      { time: "Apr", category: "Birth", count: 32 },
      { time: "May", category: "Birth", count: 38 },
      { time: "Jun", category: "Birth", count: 33 },
      { time: "Jul", category: "Birth", count: 40 },
      { time: "Aug", category: "Birth", count: 50 },
      { time: "Sep", category: "Birth", count: 43 },
      { time: "Oct", category: "Birth", count: 55 },
      { time: "Nov", category: "Birth", count: 62 },
      { time: "Dec", category: "Birth", count: 70 },
    ],
    Admission: [
      { time: "Jan", category: "Admission", count: 34 },
      { time: "Feb", category: "Admission", count: 42 },
      { time: "Mar", category: "Admission", count: 53 },
      { time: "Apr", category: "Admission", count: 61 },
      { time: "May", category: "Admission", count: 69 },
      { time: "Jun", category: "Admission", count: 75 },
      { time: "Jul", category: "Admission", count: 82 },
      { time: "Aug", category: "Admission", count: 94 },
      { time: "Sep", category: "Admission", count: 88 },
      { time: "Oct", category: "Admission", count: 101 },
      { time: "Nov", category: "Admission", count: 113 },
      { time: "Dec", category: "Admission", count: 120 },
    ],
    Emergency: [
      { time: "Jan", category: "Emergency", count: 18 },
      { time: "Feb", category: "Emergency", count: 28 },
      { time: "Mar", category: "Emergency", count: 39 },
      { time: "Apr", category: "Emergency", count: 50 },
      { time: "May", category: "Emergency", count: 60 },
      { time: "Jun", category: "Emergency", count: 65 },
      { time: "Jul", category: "Emergency", count: 72 },
      { time: "Aug", category: "Emergency", count: 80 },
      { time: "Sep", category: "Emergency", count: 85 },
      { time: "Oct", category: "Emergency", count: 90 },
      { time: "Nov", category: "Emergency", count: 97 },
      { time: "Dec", category: "Emergency", count: 105 },
    ],
    Death: [
      { time: "Jan", category: "Death", count: 8 },
      { time: "Feb", category: "Death", count: 12 },
      { time: "Mar", category: "Death", count: 18 },
      { time: "Apr", category: "Death", count: 15 },
      { time: "May", category: "Death", count: 22 },
      { time: "Jun", category: "Death", count: 19 },
      { time: "Jul", category: "Death", count: 24 },
      { time: "Aug", category: "Death", count: 30 },
      { time: "Sep", category: "Death", count: 28 },
      { time: "Oct", category: "Death", count: 35 },
      { time: "Nov", category: "Death", count: 40 },
      { time: "Dec", category: "Death", count: 42 },
    ],
  };

  // Calculate total count for a category
  const calculateTotal = (category: Category) => {
    return categoryData[category].reduce((acc, item) => acc + item.count, 0);
  };

  // Generate line chart data
  const lineChartData = (category: Category, color: string) => {
    const categoryFilteredData = categoryData[category];
    return {
      labels: categoryFilteredData.map((item) => item.time),
      datasets: [
        {
          label: `${category} Over Time`,
          data: categoryFilteredData.map((item) => item.count),
          fill: false,
          backgroundColor: color, // Custom color passed for each chart
          borderColor: color,
        },
      ],
    };
  };

  // Generate bar chart data
  const barChartData = (category: Category, color: string) => {
    const categoryFilteredData = categoryData[category];
    return {
      labels: categoryFilteredData.map((item) => item.time),
      datasets: [
        {
          label: `${category} Over Time`,
          data: categoryFilteredData.map((item) => item.count),
          backgroundColor: color, // Custom color passed for each chart
        },
      ],
    };
  };

  // Chart options to remove legends and set horizontal grid lines
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // Remove the legend
      },
    },
    scales: {
      x: {
        grid: {
          display: false,  // Remove vertical grid lines
        },
      },
      y: {
        grid: {
          display: true,  // Keep horizontal grid lines
        },
      },
    },
  };

  return (
    <div className="poppins-regular px-8 pt-6 w-full bg-gray-50 h-full overscroll-y-none overflow-y-hidden">
      <div className="flex flex-wrap gap-6 mb-6">
        {/* Diagnosis, Admission, and Emergency Charts on the same row */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1 relative">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Diagnosis Over Time</h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Line data={lineChartData("Diagnosis", "#6B8E23")} options={chartOptions} />
            <div className="absolute top-3 right-3 font-semibold text-sm text-[#6B8E23]">
              <span>Total: </span>{calculateTotal("Diagnosis")}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1 relative">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Admission Over Time</h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Line data={lineChartData("Admission", "#4682B4")} options={chartOptions} />
            <div className="absolute top-3 right-3 font-semibold text-sm text-[#4682B4]">
              <span>Total: </span>{calculateTotal("Admission")}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1 relative">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Emergency Over Time</h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Line data={lineChartData("Emergency", "#FF6347")} options={chartOptions} />
            <div className="absolute top-3 right-3 font-semibold text-sm text-[#FF6347]">
              <span>Total: </span>{calculateTotal("Emergency")}
            </div>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col gap-6 mb-6 justify-between">
        {/* Birth, Death, and Insights on the same row */}
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1 relative">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Birth Over Time</h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Bar data={barChartData("Birth", "#87CEEB")} options={chartOptions} />
            <div className="absolute top-3 right-3 font-semibold text-sm text-[#87CEEB]">
              <span>Total: </span>{calculateTotal("Birth")}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1 relative">
          <h2 className="text-sm font-semibold text-gray-800 mb-2">Death Over Time</h2>
          <div style={{ width: "100%", height: "220px" }}>
            <Bar data={barChartData("Death", "#DAA520")} options={chartOptions} />
            <div className="absolute top-3 right-3 font-semibold text-sm text-[#DAA520]">
              <span>Total: </span>{calculateTotal("Death")}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Insights & Recommendations</h2>
          <ul className="flex text-sm flex-col space-y-4">
            <li className="flex items-center space-x-3">
              <FaDoctor size={20} />
              <span>Diagnoses have been steadily increasing over the months, suggesting the need for additional medical staff.</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaStethoscope size={20} />
              <span>Emergency cases have fluctuated, potentially indicating stress on emergency services.</span>
            </li>
            <li className="flex items-center space-x-3">
              <FaUserAlt size={20} />
              <span>The number of births has consistently increased, which may require planning for additional maternity wards.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
