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

const GEmergencyTabCharts = ({ companyId }: { companyId: string }) => {
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

    // Function to abbreviate month names (e.g., "January" => "Jan")
    const abbreviateMonths = (monthNames: string[]) => {
      return monthNames.map((month) => {
        const date = new Date(`${month} 1, 2021`); // using a placeholder year
        return date.toLocaleString("en-US", { month: "short" }); // abbreviated month
      });
    };

    // Fetch data for the line chart (month counts)
    const fetchLineChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/emergencies/${companyId}/all/months-count`;
        const { data } = await axios.get(url);

        const abbreviatedMonths = abbreviateMonths(
          Object.keys(data.monthsCount)
        );

        setLineChartData({
          labels: abbreviatedMonths, // Using abbreviated month names
          datasets: [
            {
              label: "Incidents",
              data: Object.values(data.monthsCount),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching line chart data:", error);
      }
    };

    // Fetch data for the pie chart (type distribution)
    const fetchPieChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/emergencies/${companyId}/all/type-distribution`;
        const { data } = await axios.get(url);

        setPieChartData({
          labels: Object.keys(data.typeDistribution),
          datasets: [
            {
              data: Object.values(data.typeDistribution),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF7F50",
                "#32CD32",
              ],
            },
          ],
        });
      } catch (error) {
        console.log("Error fetching pie chart data:", error);
      }
    };

    // Fetch data for the bar chart (severity distribution)
    const fetchBarChartData = async () => {
      try {
        const url = `http://127.0.0.1:8000/api/emergencies/${companyId}/all/severity-count`;
        const { data } = await axios.get(url);

        setBarChartData({
          labels: Object.keys(data.severityCounts),
          datasets: [
            {
              label: "Severity Levels",
              data: Object.values(data.severityCounts),
              backgroundColor: ["#4CAF50", "#FFC107", "#F44336", "#8B0000"],
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
        ticks: { stepSize: 1 },
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
            Incident Timeline
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {lineChartData && (
              <Line data={lineChartData} options={lineChartOptions} />
            )}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-3">
            Category Distribution
          </h2>
          <div style={{ width: "100%", height: "200px" }}>
            {pieChartData && (
              <Pie data={pieChartData} options={pieChartOptions} />
            )}
          </div>
        </div>

        <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200 flex-1">
          <h2 className="text-sm text-center font-semibold text-gray-800 mb-2">
            Severity Distribution
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

export default GEmergencyTabCharts;
