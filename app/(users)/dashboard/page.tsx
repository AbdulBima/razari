"use client";

import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Breadcrumb from "@/components/navigation/Breadcrumb";

type Category = "Diagnosis" | "Admission" | "Birth" | "Emergency" | "Death";

type DataPoint = {
  time: string;
  category: Category;
  count: number;
};

const categoryData: Record<Category, DataPoint[]> = {
  Diagnosis: [
    { time: "Jan", category: "Diagnosis", count: 28 },
    { time: "Feb", category: "Diagnosis", count: 37 },
    { time: "Mar", category: "Diagnosis", count: 40 },
    { time: "Apr", category: "Diagnosis", count: 45 },
    { time: "May", category: "Diagnosis", count: 50 },
    { time: "Jun", category: "Diagnosis", count: 60 },
    { time: "Jul", category: "Diagnosis", count: 75 },
    { time: "Aug", category: "Diagnosis", count: 80 },
    { time: "Sep", category: "Diagnosis", count: 90 },
    { time: "Oct", category: "Diagnosis", count: 95 },
    { time: "Nov", category: "Diagnosis", count: 120 },
    { time: "Dec", category: "Diagnosis", count: 130 },
  ],
  Admission: [
    { time: "Jan", category: "Admission", count: 34 },
    { time: "Feb", category: "Admission", count: 42 },
    { time: "Mar", category: "Admission", count: 50 },
    { time: "Apr", category: "Admission", count: 55 },
    { time: "May", category: "Admission", count: 65 },
    { time: "Jun", category: "Admission", count: 70 },
    { time: "Jul", category: "Admission", count: 80 },
    { time: "Aug", category: "Admission", count: 90 },
    { time: "Sep", category: "Admission", count: 100 },
    { time: "Oct", category: "Admission", count: 110 },
    { time: "Nov", category: "Admission", count: 115 },
    { time: "Dec", category: "Admission", count: 120 },
  ],
  Birth: [
    { time: "Jan", category: "Birth", count: 15 },
    { time: "Feb", category: "Birth", count: 18 },
    { time: "Mar", category: "Birth", count: 20 },
    { time: "Apr", category: "Birth", count: 22 },
    { time: "May", category: "Birth", count: 25 },
    { time: "Jun", category: "Birth", count: 28 },
    { time: "Jul", category: "Birth", count: 30 },
    { time: "Aug", category: "Birth", count: 32 },
    { time: "Sep", category: "Birth", count: 35 },
    { time: "Oct", category: "Birth", count: 38 },
    { time: "Nov", category: "Birth", count: 40 },
    { time: "Dec", category: "Birth", count: 42 },
  ],
  Death: [
    { time: "Jan", category: "Death", count: 5 },
    { time: "Feb", category: "Death", count: 6 },
    { time: "Mar", category: "Death", count: 7 },
    { time: "Apr", category: "Death", count: 8 },
    { time: "May", category: "Death", count: 9 },
    { time: "Jun", category: "Death", count: 10 },
    { time: "Jul", category: "Death", count: 11 },
    { time: "Aug", category: "Death", count: 12 },
    { time: "Sep", category: "Death", count: 13 },
    { time: "Oct", category: "Death", count: 14 },
    { time: "Nov", category: "Death", count: 15 },
    { time: "Dec", category: "Death", count: 16 },
  ],
  Emergency: [
    { time: "Jan", category: "Emergency", count: 50 },
    { time: "Feb", category: "Emergency", count: 55 },
    { time: "Mar", category: "Emergency", count: 60 },
    { time: "Apr", category: "Emergency", count: 65 },
    { time: "May", category: "Emergency", count: 70 },
    { time: "Jun", category: "Emergency", count: 75 },
    { time: "Jul", category: "Emergency", count: 80 },
    { time: "Aug", category: "Emergency", count: 85 },
    { time: "Sep", category: "Emergency", count: 90 },
    { time: "Oct", category: "Emergency", count: 95 },
    { time: "Nov", category: "Emergency", count: 100 },
    { time: "Dec", category: "Emergency", count: 105 },
  ],
};

const calculateTotal = (category: Category) => {
  return categoryData[category].reduce((acc, item) => acc + item.count, 0);
};

const categoryIcons: Record<Category, React.ReactNode> = {
  Diagnosis: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#356966"
        d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9.446 7.032l1.504 1.503l-1.415 1.415l-1.503-1.504a4 4 0 1 1 1.414-1.414M18 20a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
  ),
  Admission: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#356966"
        d="M20 9.556V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.526 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.474-.811-2.75-2-3.444M11 9H6V7h5zm7 0h-5V7h5z"
      />
    </svg>
  ),
  Birth: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 24 24"
    >
      <path
        fill="#356966"
        d="M12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2m-2 5q0 .825.588 1.413T12 9t1.413-.587T14 7t-.587-1.412T12 5t-1.412.588T10 7m2 3q-1.65 0-3.075.538T7.5 12.5v4q0 1.425 1.425 1.938T12 18.95q.425 0 .713-.288T13 17.95t-.288-.712T12 16.95q-.5.05-.975-.05t-.95-.3q-.275-.125-.35-.388t.1-.462q.425-.425 1-.588T12 15q.925 0 1.713.325t.787 1.125v.85q0 .3.213.525t.512.225q.575 0 .925-.475t.35-1.075v-4q0-1.425-1.425-1.963T12 10m0 4.5q-.525 0-.888-.363t-.362-.887t.363-.888T12 12t.888.363t.362.887t-.363.888T12 14.5"
      />
    </svg>
  ),
  Death: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#356966"
        d="M2.05 13h19.9c-.5 5.05-4.76 9-9.95 9c-5.18 0-9.45-3.95-9.95-9m19.9-2H2.05c.5-5.05 4.77-9 9.95-9s9.45 3.95 9.95 9M12 6.75a2.5 2.5 0 0 0-2.5-2.5A2.5 2.5 0 0 0 7 6.75a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5"
      />
    </svg>
  ),
  Emergency: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="#356966"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 4.627a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m.75 8.996v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 1.5 0"
      />
    </svg>
  ),
};

const broadDiseaseCategories = [
  { name: "Cardiovascular", count: 145 },
  { name: "Respiratory", count: 98 },
  { name: "Neurological", count: 72 },
  { name: "Digestive", count: 65 },
];

const diagnosisTableData = [
  {
    hospitalId: "H001",
    time: "01/01/2023",
    diagnosis: "Hypertension",
    ageGroup: "40-60",
  },
  {
    hospitalId: "H002",
    time: "01/02/2023",
    diagnosis: "Asthma",
    ageGroup: "20-40",
  },
  {
    hospitalId: "H003",
    time: "01/03/2023",
    diagnosis: "Stroke",
    ageGroup: "60+",
  },
  {
    hospitalId: "H004",
    time: "01/04/2023",
    diagnosis: "Ulcer",
    ageGroup: "20-40",
  },
  {
    hospitalId: "H005",
    time: "01/05/2023",
    diagnosis: "Diabetes",
    ageGroup: "40-60",
  },
  {
    hospitalId: "H006",
    time: "01/06/2023",
    diagnosis: "Arthritis",
    ageGroup: "60+",
  },
  {
    hospitalId: "H007",
    time: "01/07/2023",
    diagnosis: "Bronchitis",
    ageGroup: "20-40",
  },
  {
    hospitalId: "H008",
    time: "01/08/2023",
    diagnosis: "Cancer",
    ageGroup: "60+",
  },
  {
    hospitalId: "H009",
    time: "01/09/2023",
    diagnosis: "Heart Disease",
    ageGroup: "40-60",
  },
  {
    hospitalId: "H010",
    time: "01/10/2023",
    diagnosis: "Pneumonia",
    ageGroup: "60+",
  },
  {
    hospitalId: "H011",
    time: "01/11/2023",
    diagnosis: "Migraine",
    ageGroup: "20-40",
  },
  {
    hospitalId: "H012",
    time: "01/12/2023",
    diagnosis: "Anemia",
    ageGroup: "40-60",
  },
];


const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedData = diagnosisTableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const lineChartData = {
    labels: categoryData.Diagnosis.map((item) => item.time),
    datasets: [
      {
        label: "Diagnosis",
        data: categoryData.Diagnosis.map((item) => item.count),
        borderColor: "#6B8E23",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Admission",
        data: categoryData.Admission.map((item) => item.count),
        borderColor: "#4682B4",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Birth",
        data: categoryData.Birth.map((item) => item.count),
        borderColor: "#FFD700",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Death",
        data: categoryData.Death.map((item) => item.count),
        borderColor: "#FF6347",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Emergency",
        data: categoryData.Emergency.map((item) => item.count),
        borderColor: "#4b1d3f",
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: broadDiseaseCategories.map((item) => item.name),
    datasets: [
      {
        data: broadDiseaseCategories.map((item) => item.count),
        backgroundColor: ["#6B8E23", "#87CEEB", "#4682B4", "#FF6347"],
        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="md:px-8 py-2 px-6 bg-gray-100 h-full w-full  md:overflow-hidden overscroll-none">
     <Breadcrumb secondLink = {{href: "/dashboard",label: "Dashboard" }} />

  {/* Top Overview Cards */}
  <div className="grid grid-cols-2 mt-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
    {Object.keys(categoryData).map((key, index) => {
      const category = key as Category;
      return (
        <div
          key={index}
          className="relative bg-white shadow-lg rounded-lg p-3 flex items-center border-l-[6px] border-transparent"
          style={{ borderColor: "#356966" }}
        >
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            {categoryIcons[category]}
          </div>
          <div className="ml-3">
            <h3 className="text-gray-800 font-bold text-sm">
              {calculateTotal(category)}
            </h3>
            <p className="text-gray-600 text-xs">{category}</p>
          </div>
        </div>
      );
    })}
  </div>

  {/* Main Content Section */}
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
    {/* Pie Chart Section */}
    <div className="bg-white shadow-md px-4 py-4 rounded-lg border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-800 mb-4 text-center">
        Disease Categories
      </h2>
      <div className="flex justify-center" style={{ height: "200px" }}>
        <Pie
          data={pieChartData}
          options={{
            plugins: {
              legend: { position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${context.raw}`,
                },
              },
            },
            cutout: "60%",
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>

    {/* Line Chart */}
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 lg:col-span-3">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">
        Trends Over Time
      </h2>
      <div style={{ height: "200px" }}>
        <Line
          data={lineChartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { grid: { drawOnChartArea: false } },
              y: { grid: { drawOnChartArea: false } },
            },
          }}
        />
      </div>
    </div>
  </div>

  {/* Diagnosis Table */}
  <div className="bg-white shadow-sm p-4 rounded-lg mt-4 overflow-x-auto">
    <h2 className="text-xs font-semibold text-gray-800 mb-2">Diagnosis Data</h2>
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-[#356966] text-white">
          <th className="border border-gray-300 p-2 text-xs">Hospital ID</th>
          <th className="border border-gray-300 p-2 text-xs">Time</th>
          <th className="border border-gray-300 p-2 text-xs">Diagnosis</th>
          <th className="border border-gray-300 p-2 text-xs">Age Group</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((row, index) => (
          <tr key={index} className="even:bg-gray-100">
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.hospitalId}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.time}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.diagnosis}
            </td>
            <td className="border border-gray-300 p-2 text-center text-xs">
              {row.ageGroup}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex text-xs justify-between items-center mt-4">
      <span className="text-xs text-gray-600">Page {currentPage} of 2</span>
      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`px-3 py-1 border rounded ${
            currentPage === 2 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 2))}
          disabled={currentPage === 2}
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
