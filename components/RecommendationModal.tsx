"use client";

import { useState } from "react";
import axios from "axios";

// Define types for props
interface RecommendationModalProps {
  route: "admissions" | "diagnosis" | "birth" | "death" | "emergency";
  clinicId: string;
  companyId: string;
}

// Component
const RecommendationModal: React.FC<RecommendationModalProps> = ({
  route,
  clinicId,
  companyId,
}) => {
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState<boolean>(false); // For selecting the type
  const [selectedType, setSelectedType] = useState<
    "operations" | "patient" | "health" | "finance" | null
  >(null); // Selected type
  const [loading, setLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Open the type selector modal
  const openTypeSelector = () => {
    setIsTypeSelectorOpen(true);
  };

  // Handle type selection
  const handleTypeSelection = async (
    type: "operations" | "patient" | "health" | "finance"
  ) => {
    setSelectedType(type);
    setIsTypeSelectorOpen(false); // Close the type selector modal
    setLoading(true);
    setError(null);

    try {
      // Construct the API URL
      const url = `/api/recommendation/${route}/${type}?clinicId=${clinicId}&companyId=${companyId}`;

      // Make the API call
      const response = await axios.get(url);
      setApiResponse(response.data);
    } catch (error) {
      console.log("API call failed", error);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Close the modal
  const closeModal = () => {
    setSelectedType(null); // Clear selected type
    setApiResponse(null); // Clear API response
    setError(null); // Clear error
  };

  return (
    <div className="popins-regular">
      {/* Header */}
      <h2
        onClick={openTypeSelector}
        className="text-sm underline cursor-pointer underline-offset-2  text-gray-600 font-bold"
      >
        Clinic Recommendations
      </h2>

      {/* Type Selector Modal */}
      {isTypeSelectorOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Select Recommendation Type
            </h3>
            <div className="flex flex-col space-y-2">
              {["operations", "patient", "health", "finance"].map((type) => (
                <button
                  key={type}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-left"
                  onClick={() =>
                    handleTypeSelection(
                      type as "operations" | "patient" | "health" | "finance"
                    )
                  }
                >
                  {type}
                </button>
              ))}

              
            </div>

            
          </div>
        </div>
      )}

      {/* API Response Modal */}
      {selectedType && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold">{selectedType}</h2>
            
            <div className="mt-4">
              {loading ? (
                <div className="animate-spin flex items-center rounded-full h-8 w-8 border-b-4 border-orange-700"></div>
              ) : error ? (
                <>
                  <p className="text-gray-800">{error}</p>
                  <button
                    className="px-3 py-1 mt-3 bg-[#dc3545] text-white rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    {/* Display API response */}
                    {apiResponse ? (
                      <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    ) : (
                      <p>No data available.</p>
                    )}
                  </div>
                  <button
                    className="px-3 py-1 mt-3 bg-[#dc3545] text-white rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationModal;
