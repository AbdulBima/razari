"use client";

import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Chart.js types for datasets
import { ChartData } from "chart.js";
import { useRouter } from "next/navigation";
import companyApi from "@/utils/apiCompany";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  BarElement
);

interface ClinicDetails {
  clinicName: string;
  country: string;
  state: string;
}

const AdmissionCharts = ({ clinicId }: { clinicId: string }) => {
  const [clinicDetails, setClinicDetails] = useState<ClinicDetails | null>(
    null
  );
  const [lineChartData, setLineChartData] = useState<ChartData<"line"> | null>(
    null
  );
  const [pieChartData, setPieChartData] = useState<ChartData<"pie"> | null>(
    null
  );
  const [barChartData, setBarChartData] = useState<ChartData<"bar"> | null>(
    null
  );

  const router = useRouter(); // Get dynamic route parameters

  useEffect(() => {
    if (!clinicId) return;

    const fetchLineChartData = async () => {
      try {
        const url = `/admissions/${clinicId}/months-count`;
        const { data } = await companyApi.get(url);

        setClinicDetails({
          clinicName: data.clinicName,
          country: data.country,
          state: data.state,
        });

        setLineChartData({
          labels: Object.keys(data.monthsCount),
          datasets: [
            {
              label: "Admissions",
              data: Object.values(data.monthsCount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching line chart data:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const url = `/admissions/${clinicId}/demographics`;
        const { data } = await companyApi.get(url);
        setPieChartData({
          labels: Object.keys(data.demographicDistribution),
          datasets: [
            {
              data: Object.values(data.demographicDistribution),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching pie chart data:", error);
      }
    };

    const fetchBarChartData = async () => {
      try {
        const url = `/admissions/${clinicId}/gender-demographics`;
        const { data } = await companyApi.get(url);

        setBarChartData({
          labels: ["Male", "Female"],
          datasets: [
            {
              label: "Admissions",
              data: [
                data.demographicDistribution["Male"],
                data.demographicDistribution["Female"],
              ],
              backgroundColor: ["#4CAF50", "#FF5722"],
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching bar chart data:", error);
      }
    };

    fetchLineChartData();
    fetchPieChartData();
    fetchBarChartData();
  }, [clinicId]);

  const lineChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#e0e0e0", lineWidth: 1 },
        ticks: { stepSize: 5 },
      },
    },
    plugins: { legend: { display: false } },
  };

  const pieChartOptions = {
    plugins: {
      legend: { position: "bottom" as const },
    },
    cutout: "60%",
    maintainAspectRatio: false,
  };

  const barChartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#e0e0e0", lineWidth: 1 },
        ticks: { stepSize: 5 },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="mt-2 poppins-regular flex flex-col w-full gap-6 mb-2">
      {/* Display clinic information */}
      {clinicDetails && (
        <div className="flex items-center mt-3  md:mt-0 ">
          <button
            className="px-3 text-sm py-2 border bg-white text-gray-700 rounded-full hover:bg-gray-300"
            onClick={() => router.back()} // Navigate to the previous page
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#6a6969"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
              />
              <path
                fill="#6a6969"
                d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
              />
            </svg>
          </button>

          <div className="flex ml-3 uppercase font-bols text-gray-700">
            <p className="md:text-lg text-sm">
              {clinicDetails.clinicName} - {clinicDetails.country} -{" "}
              {clinicDetails.state}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm  text-center font-semibold text-gray-800 mb-2">
            Admissions Per Month
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {lineChartData && (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-3">
            Admission Type Distribution
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {pieChartData && (
              <Pie data={pieChartData} options={pieChartOptions} />
            )}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-2">
            Gender Distribution
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {barChartData && (
              <Bar data={barChartData} options={barChartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionCharts;
