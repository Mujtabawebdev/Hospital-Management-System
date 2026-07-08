import React from "react";
import { cn } from "../../utils/classNames.js";

function Input({ label, id, className = "", inputClassName = "", ...props }) {
  const inputId = id || props.name;

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={inputId} className="mb-2">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn("w-full border border-gray-300 rounded-md p-2", inputClassName)}
        {...props}
      />
    </div>
  );
}

export default Input;
