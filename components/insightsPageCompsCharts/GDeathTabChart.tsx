"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

import { ChartData } from "chart.js";

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



const GDeathTabChart = ({ companyId }: { companyId: string }) => {
  const [lineChartData, setLineChartData] = useState<ChartData<"line"> | null>(null);
  const [pieChartData, setPieChartData] = useState<ChartData<"pie"> | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData<"bar"> | null>(null);



  const abbreviateMonths = (monthNames: string[]) => {
    return monthNames.map((month) => {
      const date = new Date(`${month} 1, 2021`); // Placeholder year
      return date.toLocaleString("en-US", { month: "short" }); // Abbreviated month
    });
  };

  useEffect(() => {
    if (!companyId) return;

    const fetchLineChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/death-records/${companyId}/all/months-count`;
        const { data } = await axios.get(url);

    

        const abbreviatedLabels = abbreviateMonths(Object.keys(data.monthsCount));

        setLineChartData({
          labels: abbreviatedLabels,
          datasets: [
            {
              label: "Deaths",
              data: Object.values(data.monthsCount),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.logr("Error fetching line chart data:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/death-records/${companyId}/all/demographics`;
        const { data } = await axios.get(url);

        // Adjust pie chart to display demographic distribution (Adult-male, Adult-female, etc.)
        const demographicLabels = Object.keys(data.demographicDistribution);
        const demographicValues = Object.values(data.demographicDistribution) as number[];

        setPieChartData({
          labels: demographicLabels,
          datasets: [
            {
              data: demographicValues,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
          ],
        });
      } catch (error) {
        console.logr("Error fetching pie chart data:", error);
      }
    };

    const fetchBarChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/death-records/${companyId}/all/cause-count`;
        const { data } = await axios.get(url);

        // Adjust bar chart to display cause distribution (accident, illness, others)
        const causeLabels = Object.keys(data.causeDistribution);
        const causeValues = Object.values(data.causeDistribution);

        setBarChartData({
          labels: causeLabels,
          datasets: [
            {
              label: "Cause of Death",
              data: causeValues as (number | [number, number] | null)[],
              backgroundColor: ["#4CAF50", "#FFC107", "#FF5722"],
            },
          ],
        });
      } catch (error) {
        console.logr("Error fetching bar chart data:", error);
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
        ticks: { stepSize: 1 },
      },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="mt-2 poppins-regular flex flex-col w-full gap-6 mb-2">
    

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-2">
            Deaths Per Month
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {lineChartData && <Line data={lineChartData} options={lineChartOptions} />}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-3">
            Age-Group Distribution
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {pieChartData && <Pie data={pieChartData} options={pieChartOptions} />}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-2">
            Cause Distribution
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {barChartData && <Bar data={barChartData} options={barChartOptions} />}
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default GDeathTabChart;
