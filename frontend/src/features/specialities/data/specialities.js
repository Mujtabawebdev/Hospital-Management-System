export const fallbackSpecialities = [
  {
    name: "Cardiology",
    icon: "HeartPulse",
    desc: "For heart and blood pressure problems",
    symptoms: ["Chest pain", "Heart failure", "Cholesterol"],
  },
  {
    name: "Dermatology",
    icon: "Leaf",
    desc: "Specialists for skin and hair treatments",
    symptoms: ["Rashes", "Pimples", "Acne", "Hairfall"],
  },
  {
    name: "ENT",
    icon: "Ear",
    desc: "Ear, nose and throat specialists",
    symptoms: ["Earache", "Bad breath", "Swollen neck", "Vertigo"],
  },
  {
    name: "General Physician/Internal Medicine",
    icon: "Stethoscope",
    desc: "Managing acute medical conditions",
    symptoms: ["Typhoid", "Abdominal pain", "Migraine", "Infections"],
  },
  {
    name: "Neurology",
    icon: "Brain",
    desc: "Managing issues of the nervous system and brain",
    symptoms: ["Stroke", "Dementia", "Epilepsy", "Movement issues"],
  },
  {
    name: "Obstetrics & Gynaecology",
    icon: "Baby",
    desc: "For women's health issues and surgeries",
    symptoms: ["Irregular periods", "Pregnancy", "PCOD/PCOS"],
  },
  {
    name: "Orthopaedics",
    icon: "Bone",
    desc: "Managing issues of bones, joints and knees",
    symptoms: ["Knee pain", "Shoulder pain", "Bone deformity"],
  },
  {
    name: "Paediatrics",
    icon: "Baby",
    desc: "Specialists to care for and treat children",
    symptoms: ["Constipation", "Puberty", "Nutrition", "Autism"],
  },
];

export const getSpecialityOptions = (specialities = []) => {
  const names = [...specialities, ...fallbackSpecialities]
    .map((speciality) => speciality?.name?.trim())
    .filter(Boolean);

  return [...new Set(names)];
};
