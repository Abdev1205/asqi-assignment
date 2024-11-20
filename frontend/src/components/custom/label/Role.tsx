import { cn } from "@/lib/utils";
import React from "react";

const roles = {
  admin: {
    label: "Admin",
    permissions: ["create", "read", "update", "delete"],
    styles: "bg-green-500 text-white",
  },
  employee: {
    label: "Employee",
    permissions: ["read"],
    styles: "bg-blue-500 text-white",
  },
};

interface RoleProps {
  role: keyof typeof roles;
}

const Role: React.FC<RoleProps> = ({ role = "employee" }) => {
  const currentRole = roles[role];
  return (
    <div
      className={cn(
        "font-openSans  text-[.8rem] p-[.2rem] px-[.7rem] rounded-full ",
        currentRole.styles
      )}
    >
      {currentRole.label}
    </div>
  );
};

export default Role;
