import React from "react";
import { MdDashboard } from "react-icons/md";
import { TbBriefcase } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { BsPieChart } from "react-icons/bs";
import { TbSettings2 } from "react-icons/tb";
import { FaUsersRectangle } from "react-icons/fa6";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

export const menuData: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <MdDashboard />,
    path: "/",
  },
  {
    label: "Roles",
    icon: <TbBriefcase />,
    path: "/roles",
  },
  {
    label: "Employees",
    icon: <FaUsers />,
    path: "/employees",
    // children: [
    //   {
    //     label: "All Employees",
    //     icon: <CgEditBlackPoint />,
    //     path: "/employees/all",
    //   },
    //   {
    //     label: "Recent hires",
    //     icon: <CgEditBlackPoint />,
    //     path: "/employees/recent",
    //   },
    // ],
  },
  {
    label: "Department",
    icon: <FaUsersRectangle />,
    path: "/department",
  },
  {
    label: "Payroll",
    icon: <IoReceiptOutline />,
    path: "/payroll",
  },
  {
    label: "Reports",
    icon: <BsPieChart />,
    path: "/reports",
  },
  {
    label: "Settings",
    icon: <TbSettings2 />,
    path: "/settings",
  },
];
