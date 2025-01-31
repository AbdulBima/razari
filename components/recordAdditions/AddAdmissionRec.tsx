/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Modal from "@/components/PopAlert";

const admissionSchema = z.object({
  gender: z.enum(["Male", "Female"]),
  ageGroup: z.enum(["Adult", "Child"]),
  reason: z.string().min(5, "Reason must be at least 5 characters long"),
  submitterId: z.string().min(1),
  companyId: z.string().min(1),
  clinicId: z.string().min(1),
});

type AdmissionFormData = z.infer<typeof admissionSchema>;

export default function AddAdmisionRec() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,  // Add reset here
    formState: { errors, isSubmitting },
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionSchema),
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

  const onSubmit = async (data: AdmissionFormData) => {
    const payload = { ...data, time: new Date().toISOString() };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admissions/create",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setNotification({
          message: "Admission record created successfully!",
          type: "success",
        });
        reset(); // Reset the form after successful submission
      } else {
        setNotification({
          message: "Failed to create admission record.",
          type: "error",
        });
      }
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
    Admission Form
      </h2>

      {notification && (
        <Modal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            {...register("gender")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Age Group
          </label>
          <select
            {...register("ageGroup")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Age Group</option>
            <option value="Adult">Adult</option>
            <option value="Child">Child</option>
          </select>
          {errors.ageGroup && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ageGroup.message}
            </p>
          )}
        </div>

        {/* Reason for Admission */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reason for Admission
          </label>
          <input
            type="text"
            {...register("reason")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
            placeholder="Enter reason"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* Hidden Fields for localStorage data */}
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
            className="w-full bg-[#356966] hover:bg-[#2d5048] text-white font-semibold p-3 rounded-xl transition-transform transform hover:scale-105"
          >
            Submit Admission
          </button>
        )}
      </form>
    </div>
  );
}
