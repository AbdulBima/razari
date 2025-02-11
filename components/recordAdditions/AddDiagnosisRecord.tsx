"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/PopAlert";
import staffApi from "@/utils/apiStaff";

const diagnosisSchema = z.object({
  category: z.enum([
    "Infectious Diseases",
    "Chronic Conditions",
    "Respiratory Issues",
    "Mental Health Issues",
    "Cardiovascular Diseases",
    "Neurological Disorders",
    "Musculoskeletal Disorders",
    "Gastrointestinal Disorders",
    "Other",
  ]),
  ageGroup: z.enum(["Adult-Male", "Adult-Female", "Child-Male", "Child-Female"]),
  diagnosis: z.string().min(1, "Diagnosis details are required"),
  submitterId: z.string().min(1),
  companyId: z.string().min(1),
  clinicId: z.string().min(1),
});

type DiagnosisFormData = z.infer<typeof diagnosisSchema>;

export default function AddDiagnosisRecord() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiagnosisFormData>({
    resolver: zodResolver(diagnosisSchema),
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

  const onSubmit = async (data: DiagnosisFormData) => {
    const payload = { ...data, time: new Date().toISOString() };

    try {
      const response = await staffApi.post(
        "/diagnosis/create",
        payload
      );

      if (response.status === 200) {
        setNotification({
          message: "Diagnosis record created successfully!",
          type: "success",
        });
        reset();
      } else {
        setNotification({
          message: "Failed to create diagnosis record.",
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
        Diagnosis Record Form
      </h2>

      {notification && (
        <Modal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Diagnosis Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Diagnosis Category
          </label>
          <select
            {...register("category")}
            className="mt-1 block w-full p-2 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Category</option>
            {Object.values(diagnosisSchema.shape.category._def.values).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
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
            {Object.values(diagnosisSchema.shape.ageGroup._def.values).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
          {errors.ageGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.ageGroup.message}</p>
          )}
        </div>

        {/* Diagnosis Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Diagnosis Details
          </label>
          <textarea
            {...register("diagnosis")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
            rows={3}
          ></textarea>
          {errors.diagnosis && (
            <p className="text-red-500 text-sm mt-1">{errors.diagnosis.message}</p>
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
