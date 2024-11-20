import React from "react";
import { SingleLinkProps } from "./SingleLink";
import { NavLink } from "react-router-dom";

interface SubLinkProps extends SingleLinkProps {
  children?: React.ReactNode;
}
const SubLink: React.FC<SubLinkProps> = ({ label, icon, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-[.4rem] rounded-[.3rem] ${
          isActive ? "text-white bg-orange-600" : "text-gray-700"
        } text-[.85rem] rounded-[.3rem] hover:bg-primary/10 hover:text-black duration-300`
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
};

export default SubLink;
