import React, { useState } from "react";
import { menuData } from "@/constants/menuData";
import { SingleLink } from "./SingleLink";
import { MultiLink } from "./MultiLink";
import Image from "../Image";
import { LogoImage } from "@/assets/assetManger";
import DepartmentSelect from "../select/DepartmentSelect";
import CreateDepartment from "../modal/CreateDepartment";
import { Button } from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";

export const Sidebar: React.FC = () => {
  const [depModal, setDepModal] = useState(false);
  return (
    <aside className="w-64 h-screen bg-white border-r">
      <CreateDepartment visible={depModal} onClose={() => setDepModal(false)} />
      <div className="  h-[5.5rem] px-[1.5rem]  flex items-center gap-[.5rem]  ">
        <Image src={LogoImage} alt="ASQI" className="  w-[12rem]    " />
      </div>

      <div className="flex flex-col justify-between h-[calc(100%-5.5rem)] ">
        <nav className=" flex flex-col px-[.7rem] mt-[1rem]   ">
          <DepartmentSelect />
          {menuData.map((item) =>
            item.children ? (
              <MultiLink
                key={item.label}
                label={item.label}
                icon={item.icon}
                children={item.children}
              />
            ) : (
              <SingleLink
                key={item.label}
                label={item.label}
                icon={item.icon}
                path={item.path!}
              />
            )
          )}
        </nav>

        <div className=" px-[.7rem] mb-[2rem] ">
          <Button
            onClick={() => setDepModal(true)}
            className=" bg-[#C5D3E8]/50 w-full text-primary  hover:bg-[#C5D3E8]/80 rounded-[.3rem]  "
          >
            <span className=" flex size-[1.2rem] justify-center items-center rounded-full border-[1px] border-dashed border-primary ">
              <IoMdAdd className="" />
            </span>
            New Department
          </Button>
        </div>
      </div>
    </aside>
  );
};
