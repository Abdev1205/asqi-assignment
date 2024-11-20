import React from "react";
import { Sidebar } from "../custom/nav/Sidebar";
import AppNavbar from "../custom/nav/AppNavbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className=" w-full h-[100vh] flex font-openSans  ">
      <Sidebar />
      <div className=" w-[calc(100%-16rem)] ">
        <AppNavbar />
        <div className=" h-[calc(100vh-4rem)] ">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
