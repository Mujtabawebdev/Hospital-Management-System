import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../utils/classNames.js";

function Input({ label, id, className = "", inputClassName = "", ...props }) {
  const inputId = id || props.name;
  const [visible, setVisible] = useState(false);
  const isPassword = props.type === "password";

  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={inputId} className="mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input id={inputId} className={cn("w-full border border-gray-300 rounded-md p-2", isPassword && "pr-10", inputClassName)} {...props} type={isPassword && visible ? "text" : props.type} />
        {isPassword && <button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? "Hide password" : "Show password"} className="absolute inset-y-0 right-2 text-slate-500">{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
      </div>
    </div>
  );
}

export default Input;
