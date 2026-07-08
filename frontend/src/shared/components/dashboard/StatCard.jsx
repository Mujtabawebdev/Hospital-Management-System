import React from "react";
import DashboardCard from "./DashboardCard.jsx";

function StatCard({ title, value, icon: Icon, accent = "blue", helper }) {
  const accents = {
    blue: "bg-blue-50 text-blue-600",
    teal: "bg-teal-50 text-teal-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-violet-50 text-violet-600",
  };

  return (
    <DashboardCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-black text-[#0f1f44]">{value}</p>
          {helper && <p className="mt-2 text-xs font-semibold text-slate-500">{helper}</p>}
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accents[accent] || accents.blue}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </DashboardCard>
  );
}

export default StatCard;
