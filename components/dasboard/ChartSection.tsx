// ChartSection.tsx
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import companyApi from "@/utils/apiCompany";

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
          admissionRes,
        ] = await Promise.all([
          companyApi.get(
            `/diagnosis/company/${companyId}/months-count`
          ),
          companyApi.get(
            `/emergencies/company/${companyId}/months-count`
          ),
          companyApi.get(
            `/death-records/company/${companyId}/months-count`
          ),
          companyApi.get(
            `/birth-records/company/${companyId}/months-count`
          ),
          companyApi.get(
            `/admissions/company/${companyId}/months-count`
          ),
        ]);
  
        // Extracting month data from responses
        const months = Object.keys(diagnosisRes.data.diagnosis_monthsCount);
  
        // Map full month names or numbers to abbreviations
        const abbreviatedMonths = months.map((month) => {
          const date = new Date(`${month} 1, 2000`);
          return date.toLocaleString("default", { month: "short" });
        });
  
        const chartData = {
          labels: abbreviatedMonths,
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
        console.log("Error fetching chart data:", error);
      }
    };
  
    fetchData();
  }, [companyId]);
  
  if (!chartData) {
    return <div></div>;
  }

  return (
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 lg:col-span-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-2">Current Year Trend</h2>
      <div style={{ height: "200px"}}>
      <Line
  data={chartData}
  options={{
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 5, // Increase this value for more space above the chart
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 15, // Size of the legend box
        },
      },
    },
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
