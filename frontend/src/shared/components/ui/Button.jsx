import React from "react";
import { cn } from "../../utils/classNames.js";

const variants = {
  primary: "bg-main_theme text-white hover:bg-dark_theme",
  secondary: "border border-dark_theme text-dark_theme hover:bg-light_theme",
  blue: "bg-blue-500 text-white hover:bg-blue-700",
  green: "bg-green-500 text-white hover:bg-green-600",
  red: "bg-red-500 text-white hover:bg-red-600",
  ghost: "bg-transparent text-dark_theme hover:bg-light_theme",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-4 py-3 text-lg",
  icon: "p-2",
};

function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-main_theme/30 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
