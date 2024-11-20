import React, { useState } from "react";
import { MenuItem } from "@/constants/menuData";
import SubLink from "./SubLink";
import { MdKeyboardArrowDown } from "react-icons/md";

interface MultiLinkProps {
  label: string;
  icon?: React.ReactNode;
  children: MenuItem[];
}

export const MultiLink: React.FC<MultiLinkProps> = ({
  label,
  icon,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-[.3rem] hover:bg-primary hover:text-white duration-300 "
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span>{label}</span>
        </div>
        <MdKeyboardArrowDown
          className={` ${
            isOpen ? "" : "rotate-180"
          } duration-300 text-[1.3rem] `}
        />
      </button>
      {isOpen && (
        <div className="pl-6 mt-2 space-y-1">
          {children.map((child) => (
            <SubLink
              key={child.label}
              icon={child.icon}
              label={child.label}
              path={child.path!}
            />
          ))}
        </div>
      )}
    </div>
  );
};
