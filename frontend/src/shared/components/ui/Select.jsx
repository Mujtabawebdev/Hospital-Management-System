import React from "react";
import { cn } from "../../utils/classNames.js";

function Select({ label, id, className = "", selectClassName = "", children, ...props }) {
  const selectId = id || props.name;

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={selectId} className="mb-2">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn("w-full border border-gray-300 rounded-md p-2", selectClassName)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export default Select;
