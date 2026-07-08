import React from "react";
import { cn } from "../../utils/classNames.js";

function Textarea({ label, id, className = "", textareaClassName = "", ...props }) {
  const textareaId = id || props.name;

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={textareaId} className="mb-2">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn("w-full border border-gray-300 rounded-md p-2", textareaClassName)}
        {...props}
      />
    </div>
  );
}

export default Textarea;
