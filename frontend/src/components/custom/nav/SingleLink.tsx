import React from "react";
import { NavLink } from "react-router-dom";

export interface SingleLinkProps {
  label: string;
  icon?: React.ReactNode;
  path: string;
}

export const SingleLink: React.FC<SingleLinkProps> = ({
  label,
  icon,
  path,
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2  ${
          isActive ? "text-white bg-primary" : "text-gray-700"
        } rounded-[.3rem] hover:bg-primary hover:text-white duration-300`
      }
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
};
