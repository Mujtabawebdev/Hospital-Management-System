import React from "react";
import { Link } from "react-router-dom";
import { Baby, Bone, Brain, Ear, HeartPulse, Leaf, Stethoscope } from "lucide-react";
import { SkeletonLoading, useLoading } from "../../../import-export/ImportExport";
import { Card } from "../../../shared/components/ui";

const iconMap = {
  Baby,
  Bone,
  Brain,
  Ear,
  HeartPulse,
  Leaf,
  Stethoscope,
};

const SpecialitiesCard = ({ speciality }) => {
  const loading = useLoading(1000);
  const Icon = iconMap[speciality?.icon] || Stethoscope;
  const isImageIcon = typeof speciality?.icon === "string" && speciality.icon.startsWith("/");

  if (loading || !speciality) return <SkeletonLoading type="speciality" />;

  return (
    <Link
      to={`/specialties/${encodeURIComponent(speciality.name)}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-dark_theme focus-visible:ring-offset-2"
    >
      <Card as="section" className="w-full flex flex-col gap-y-3 items-center max-w-72 min-h-64 border-text_grey/40 py-3 px-3 bg-gray-300/20 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md text-center">
        {/* title */}
        <div className="overflow-hidden w-full">
          <h2 className="text-lg md:text-xl font-semibold text-dark_theme line-clamp-1">
            {speciality.name}
          </h2>
        </div>

        {/* icon */}
        <div className="flex justify-center items-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-white text-dark_theme shadow-sm mb-2">
          {isImageIcon ? (
            <img
              src={speciality.icon}
              alt=""
              className="h-12 w-12 md:h-16 md:w-16 object-contain object-center mix-blend-multiply border-none"
            />
          ) : (
            <Icon aria-hidden="true" className="h-9 w-9 md:h-12 md:w-12" strokeWidth={1.8} />
          )}
        </div>

        {/* description */}
        <div className="overflow-hidden w-full">
          <p className="text-sm text-dark_theme/80 text-center tracking-tight leading-tight line-clamp-2">
            {speciality.desc}
          </p>
        </div>

        <div className="overflow-hidden w-full">
          <p className="text-sm text-center text-dark_theme font-medium tracking-tight leading-tight line-clamp-2">
            {(speciality.symptoms || []).join(", ")}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default SpecialitiesCard;
