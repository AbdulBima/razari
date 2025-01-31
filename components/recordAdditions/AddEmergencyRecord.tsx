"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Modal from "@/components/PopAlert";

const emergencySchema = z.object({
  type: z.enum(["Trauma", "Medical", "Surgical", "Obstetric", "Pediatric"]),
  severity: z.enum(["High", "Moderate", "Critical", "Low"]),
  submitterId: z.string().min(1),
  companyId: z.string().min(1),
  clinicId: z.string().min(1),
});

type EmergencyFormData = z.infer<typeof emergencySchema>;

export default function AddEmergencyRecord() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmergencyFormData>({
    resolver: zodResolver(emergencySchema),
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    setValue("submitterId", localStorage.getItem("sttx") || "");
    setValue("companyId", localStorage.getItem("sttxcm") || "");
    setValue("clinicId", localStorage.getItem("sttxci") || "");
  }, [setValue]);

  const onSubmit = async (data: EmergencyFormData) => {
    const payload = { ...data, time: new Date().toISOString() };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/emergencies/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setNotification({
          message: "Emergency record created successfully!",
          type: "success",
        });
        reset();
      } else {
        setNotification({
          message: "Failed to create emergency record.",
          type: "error",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setNotification({
        message: "Network error. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="poppins-regular w-full md:max-w-lg mx-auto shadow-lg mt-6 md:mt-10 px-6 md:px-6 py-8 bg-white rounded-3xl transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold text-gray-600 mb-6 text-center">
        Emergency Record Form
      </h2>

      {notification && (
        <Modal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Emergency Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Emergency Type
          </label>
          <select
            {...register("type")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Type</option>
            {Object.values(emergencySchema.shape.type._def.values).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Emergency Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity Level
          </label>
          <select
            {...register("severity")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Severity</option>
            {Object.values(emergencySchema.shape.severity._def.values).map(
              (severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              )
            )}
          </select>
          {errors.severity && (
            <p className="text-red-500 text-sm mt-1">{errors.severity.message}</p>
          )}
        </div>

        {/* Hidden Fields */}
        <input type="hidden" {...register("submitterId")} />
        <input type="hidden" {...register("companyId")} />
        <input type="hidden" {...register("clinicId")} />

        {/* Submit Button */}
        {isSubmitting ? (
          <div className="w-full py-2 flex items-center justify-center rounded-full bg-gray-100 cursor-not-allowed mb-4">
            <div className="animate-spin h-5 w-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full mt-8 bg-[#356966] hover:bg-[#2d5048] text-white font-semibold p-3 rounded-xl transition-transform transform hover:scale-100"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
