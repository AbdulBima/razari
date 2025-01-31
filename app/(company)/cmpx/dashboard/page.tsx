// Dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { Category } from "@/types/types";
import DashboardOverview from "@/components/dasboard/DashboardOverview";
import ChartSection from "@/components/dasboard/ChartSection";
import DiagnosisTable from "@/components/dasboard/DiagnosisTable";
import Loader from "@/utils/loader";

const Dashboard = () => {
 
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

      
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  return (
    <div className="px-6 md:py-4">
      <Breadcrumb secondLink={{ href: "/dashboard", label: "Dashboard" }} />
      <DashboardOverview categoryTotals={categoryTotals} />
      <ChartSection />
      {loading ? (
       <Loader />
      ) : (
        <DiagnosisTable
    
        />
      )}
    </div>
  );
};

export default Dashboard;
