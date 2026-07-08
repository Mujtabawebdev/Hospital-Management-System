import React from "react";
import { cn } from "../../utils/classNames.js";

function Card({ as: Component = "div", className = "", children, ...props }) {
  return (
    <Component
      className={cn("rounded-md border border-text_grey/20 bg-white shadow-md", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
