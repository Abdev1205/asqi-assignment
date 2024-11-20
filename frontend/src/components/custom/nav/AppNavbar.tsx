import UserProfileMenu from "../menu/UserProfileMenu";
import { IoMdNotificationsOutline, IoMdAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import SearchBar from "../search/SearchBar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateEmployee from "../modal/CreateEmployee";

const AppNavbar = () => {
  const [showEmpModal, setShowEmpModal] = useState(false);

  return (
    <div className=" w-full h-[4rem] flex justify-between items-center  border-b-[1px] px-[2rem]  ">
      <div>
        <SearchBar />
      </div>

      <div className="flex items-center justify-center gap-[1rem] ">
        <Button
          onClick={() => setShowEmpModal(true)}
          className=" bg-[#6A1039] hover:bg-[#6A1039]/85 rounded-[.3rem]  "
        >
          <span className=" flex size-[1.2rem] justify-center items-center rounded-full border-[1px] border-dashed border-white ">
            <IoMdAdd className="" />
          </span>
          New Employee
        </Button>

        <IoSettingsOutline className="cursor-pointer text-[1.2rem]  " />
        <IoMdNotificationsOutline className="cursor-pointer text-[1.2rem]  " />
        <UserProfileMenu />
      </div>

      <CreateEmployee
        visible={showEmpModal}
        onClose={() => setShowEmpModal(false)}
        callback={() => window.location.reload()}
      />
    </div>
  );
};

export default AppNavbar;
