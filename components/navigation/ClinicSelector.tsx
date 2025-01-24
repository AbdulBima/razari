import React, { useState, useEffect } from "react";
import axios from "axios";

interface Clinic {
  clinicId: string;
  name: string;
  country: string;
  state: string;
  status: boolean;
}

const ClinicSelector = ({
  onSelectClinic,
}: {
  onSelectClinic: (clinicId: string | "all") => void;
}) => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      const companyId = localStorage.getItem("cmpx");
      if (companyId) {
        try {
          const response = await axios.get<Clinic[]>(`http://127.0.0.1:8000/api/clinic/${companyId}/clinic-list`);
          setClinics(response.data.filter((clinic) => clinic.status));
        } catch (error) {
          console.error("Error fetching clinics:", error);
        }
      }
      setLoading(false);
    };

    fetchClinics();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading clinics...</div>
      ) : (
        <select
          onChange={(e) => onSelectClinic(e.target.value)}
          className="border border-gray-300 px-2 py-1 mt-4 rounded-md mb-4 text-lg"
        >
          <option value="">Select a Clinic</option>
          <option value="all">All Clinics</option>
          {clinics.map((clinic) => (
            <option key={clinic.clinicId} value={clinic.clinicId}>
              {clinic.name} - {clinic.country} - {clinic.state}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ClinicSelector;
