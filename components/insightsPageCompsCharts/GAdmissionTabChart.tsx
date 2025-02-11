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

const GAdmissionTabChart = ({ companyId }: { companyId: string }) => {
  const [lineChartData, setLineChartData] = useState<ChartData<"line"> | null>(
    null
  );
  const [pieChartData, setPieChartData] = useState<ChartData<"pie"> | null>(
    null
  );
  const [barChartData, setBarChartData] = useState<ChartData<"bar"> | null>(
    null
  );

  useEffect(() => {
    if (!companyId) return;

    const fetchLineChartData = async () => {
      try {
        const url = `/admissions/${companyId}/all/months-count`;
        const { data } = await companyApi.get(url);

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
        const url = `/admissions/${companyId}/all/demographics`;
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
        const url = `/admissions/${companyId}/all/gender-demographics`;
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
  }, [companyId]);

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

export default GAdmissionTabChart;
