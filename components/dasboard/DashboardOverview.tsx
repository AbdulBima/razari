// DashboardOverview.tsx
import { Category, categoryIcons } from "@/types/types";
import React from "react";


type DashboardOverviewProps = {
  categoryTotals: Record<Category, number>;
};

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ categoryTotals }) => {
  return (
    <div className="grid grid-cols-2 mt-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
      {Object.keys(categoryTotals).map((key, index) => {
        const category = key as Category;
        return (
          <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg p-3 flex items-center border-l-[6px] border-transparent"
            style={{ borderColor: "#356966" }}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              {categoryIcons[category]}
            </div>
            <div className="ml-3">
              <h3 className="text-gray-800 font-bold text-sm">
                {categoryTotals[category]}
              </h3>
              <p className="text-gray-600 text-xs">{category}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
