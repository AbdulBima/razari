// ChartSection.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const ChartSection = () => {
  interface ChartData {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      tension: number;
      borderWidth: number;
      fill: boolean;
    }[];
  }

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const companyId = localStorage.getItem("cmpx");

  useEffect(() => {
    const fetchData = async () => {
      if (!companyId) {
        console.log("Company ID not found in local storage.");
        return;
      }

      try {
        // Fetching the data from the provided API endpoints
        const [
          diagnosisRes,
          emergencyRes,
          deathRes,
          birthRes,
          admissionRes
        ] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/diagnosis/company/${companyId}/months-count`),
          axios.get(`http://127.0.0.1:8000/api/emergencies/company/${companyId}/months-count`),
          axios.get(`http://127.0.0.1:8000/api/death-records/company/${companyId}/months-count`),
          axios.get(`http://127.0.0.1:8000/api/birth-records/company/${companyId}/months-count`),
          axios.get(`http://127.0.0.1:8000/api/admissions/company/${companyId}/months-count`),
        ]);

        // Extracting month data from responses
        const months = Object.keys(diagnosisRes.data.diagnosis_monthsCount);

        const chartData = {
          labels: months,
          datasets: [
            {
              label: "Diagnosis",
              data: Object.values(diagnosisRes.data.diagnosis_monthsCount) as number[],
              borderColor: "#6B8E23", // Olive Green
              tension: 0.4,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Emergency",
              data: Object.values(emergencyRes.data.emergency_monthsCount) as number[],
              borderColor: "#4682B4", // Steel Blue
              tension: 0.4,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Death",
              data: Object.values(deathRes.data.death_monthsCount) as number[],
              borderColor: "#FF6347", // Tomato
              tension: 0.4,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Birth",
              data: Object.values(birthRes.data.birth_monthsCount) as number[],
              borderColor: "#FFD700", // Gold
              tension: 0.4,
              borderWidth: 2,
              fill: false,
            },
            {
              label: "Admission",
              data: Object.values(admissionRes.data.admission_monthsCount) as number[],
              borderColor: "#4b1d3f", // Dark Red
              tension: 0.4,
              borderWidth: 2,
              fill: false,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [companyId]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 lg:col-span-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">Current Year Trend</h2>
      <div style={{ height: "200px" }}>
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  drawOnChartArea: false,
                },
              },
              y: {
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartSection;
