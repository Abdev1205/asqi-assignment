import { cn } from "@/lib/utils";
import React from "react";

const departments = {
  hr: {
    label: "Human Resource",
    permissions: ["create", "read", "update", "delete"],
    styles: "bg-pink-200 text-pink-700 ",
  },
  tech: {
    label: "Technical",
    permissions: ["read"],
    styles: "bg-blue-500 text-white",
  },
};

interface DepartmentProps {
  department: keyof typeof departments;
}

const Department: React.FC<DepartmentProps> = ({ department = "hr" }) => {
  const currentDep = departments[department];
  return (
    <div
      className={cn(
        "font-openSans  text-[.8rem] p-[.2rem] px-[.7rem] rounded-full ",
        currentDep?.styles
      )}
    >
      {currentDep?.label}
    </div>
  );
};

export default Department;
