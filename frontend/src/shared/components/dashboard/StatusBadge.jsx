import React from "react";

function StatusBadge({ status = "Pending" }) {
  const value = String(status || "Pending");
  const normalized = value.toLowerCase();
  const styles = normalized.includes("approved") || normalized.includes("accepted") || normalized.includes("completed")
    ? "bg-green-50 text-green-700 ring-green-200"
    : normalized.includes("rejected") || normalized.includes("cancel") || normalized.includes("suspended")
      ? "bg-red-50 text-red-700 ring-red-200"
      : normalized.includes("available") || normalized.includes("scheduled")
        ? "bg-blue-50 text-blue-700 ring-blue-200"
        : "bg-amber-50 text-amber-700 ring-amber-200";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ring-1 ${styles}`}>
      {value}
    </span>
  );
}

export default StatusBadge;
