import React from "react";
import { cn } from "../../utils/classNames.js";

function DashboardCard({ className = "", children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default DashboardCard;
