// Dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { Category, DiagnosisRecord } from "@/types/types";
import DashboardOverview from "@/components/dasboard/DashboardOverview";
import ChartSection from "@/components/dasboard/ChartSection";
import DiagnosisTable from "@/components/dasboard/DiagnosisTable";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [diagnosisData, setDiagnosisData] = useState<DiagnosisRecord[]>([]);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryTotals, setCategoryTotals] = useState<
    Record<Category, number>
  >({
    Admission: 0,
    Diagnosis: 0,
    Birth: 0,
    Death: 0,
    Emergency: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = localStorage.getItem("cmpx");
        if (!companyId) {
          throw new Error("Company ID not found in local storage.");
        }

        setLoading(true);
        const [
          admissionsRes,
          diagnosesRes,
          birthsRes,
          deathsRes,
          emergenciesRes,
        ] = await Promise.all([
          axios.get(
            `http://127.0.0.1:8000/api/admissions/company/${companyId}/total-admissions`
          ),
          axios.get(
            `http://127.0.0.1:8000/api/diagnosis/company/${companyId}/total-diagnosis`
          ),
          axios.get(
            `http://127.0.0.1:8000/api/birth-records/company/${companyId}/total-birth-records`
          ),
          axios.get(
            `http://127.0.0.1:8000/api/death-records/company/${companyId}/total-deaths`
          ),
          axios.get(
            `http://127.0.0.1:8000/api/emergencies/company/${companyId}/total-emergencies`
          ),
        ]);

        setCategoryTotals({
          Admission: admissionsRes.data.totalAdmissions,
          Diagnosis: diagnosesRes.data.totalDiagnosis,
          Birth: birthsRes.data.totalBirthRecords,
          Death: deathsRes.data.totalDeaths,
          Emergency: emergenciesRes.data.totalEmergencies,
        });

        // Fetch diagnosis table data
        const diagnosisTableData = await axios.get(
          `http://127.0.0.1:8000/api/diagnosis/company/${companyId}`
        );
        setDiagnosisData(diagnosisTableData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="px-6 py-4">
      <Breadcrumb secondLink={{ href: "/dashboard", label: "Dashboard" }} />
      <DashboardOverview categoryTotals={categoryTotals} />
      <ChartSection />
      {loading ? (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-700"></div>
        </div>
      ) : (
        <DiagnosisTable
          diagnosisData={diagnosisData}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Dashboard;
