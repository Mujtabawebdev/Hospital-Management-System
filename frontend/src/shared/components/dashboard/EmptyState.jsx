import React from "react";
import { ClipboardList } from "lucide-react";
import DashboardCard from "./DashboardCard.jsx";

function EmptyState({ title = "No data found.", description = "New activity will appear here." }) {
  return (
    <DashboardCard className="flex flex-col items-center justify-center p-10 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <ClipboardList size={26} />
      </div>
      <p className="text-lg font-black text-[#0f1f44]">{title}</p>
      <p className="mt-2 text-sm font-semibold text-slate-500">{description}</p>
    </DashboardCard>
  );
}

export default EmptyState;
