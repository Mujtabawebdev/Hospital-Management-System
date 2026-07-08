import React from "react";
import { UserRound } from "lucide-react";

function AvatarPlaceholder({ src, alt = "User", label = "MH", className = "" }) {
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-teal-100 text-sm font-black text-blue-700 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : label ? (
        <span>{label.slice(0, 2).toUpperCase()}</span>
      ) : (
        <UserRound size={22} />
      )}
    </div>
  );
}

export default AvatarPlaceholder;
