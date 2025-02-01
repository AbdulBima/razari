"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/PopAlert";
import staffApi from "@/utils/apiStaff";

const deathRecordSchema = z.object({
  cause: z.enum(["accident", "illness", "others"], {
    required_error: "Please select a cause of death.",
  }),
  category: z.enum(["Adult-male", "Child-male", "Adult-female", "Child-female"], {
    required_error: "Please select a category for the deceased.",
  }),
  submitterId: z.string().min(4, "Submitter ID must be at least 4 characters."),
  companyId: z.string().min(4, "Company ID must be at least 4 characters."),
  clinicId: z.string().min(4, "Clinic ID must be at least 4 characters."),
});

type DeathRecordFormData = z.infer<typeof deathRecordSchema>;

export default function AddDeathRecord() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DeathRecordFormData>({
    resolver: zodResolver(deathRecordSchema),
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

  const onSubmit = async (data: DeathRecordFormData) => {
    const payload = { ...data, time: new Date().toISOString() };

    try {
      const response = await staffApi.post(
        "/death-records/create",
        payload
      );

      if (response.status === 200) {
        setNotification({
          message: "Death record created successfully!",
          type: "success",
        });
        reset();
      } else {
        setNotification({
          message: "Failed to create death record.",
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
        Death Record Form
      </h2>

      {notification && (
        <Modal
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Cause of Death */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cause of Death
          </label>
          <select
            {...register("cause")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Cause</option>
            <option value="accident">Accident</option>
            <option value="illness">Illness</option>
            <option value="others">Others</option>
          </select>
          {errors.cause && (
            <p className="text-red-500 text-sm mt-1">{errors.cause.message}</p>
          )}
        </div>

        {/* Category of Deceased */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            {...register("category")}
            className="mt-1 block w-full p-3 bg-gray-100 text-gray-900 rounded-xl focus:ring-2 focus:ring-[#356966] outline-none transition duration-200"
          >
            <option value="">Select Category</option>
            <option value="Adult-male">Adult Male</option>
            <option value="Child-male">Child Male</option>
            <option value="Adult-female">Adult Female</option>
            <option value="Child-female">Child Female</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
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
            className="w-full mt-8 bg-[#356966] hover:bg-[#2d5048] text-white font-semibold p-3 rounded-xl transition-transform transform hover:scale-100"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
