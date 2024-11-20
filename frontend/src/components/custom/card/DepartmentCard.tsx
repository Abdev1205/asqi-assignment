import type { Department } from "@/types/Department";
import React from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";

interface DepartmentCardProps {
  department: Department;
  methods: {
    deleteDep: () => void;
    editDep: () => void;
  };
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  methods,
}) => {
  const { _id, name, description, createdBy } = department;

  const handleEdit = () => {
    methods.editDep();
    console.log("Edit department:", _id);
  };

  const handleDelete = () => {
    methods.deleteDep();
    console.log("Delete department:", _id);
  };

  return (
    <div className="relative w-64 p-4 bg-white border rounded-[.5rem] cursor-pointer font-openSans hover:shadow-lg group">
      <div className="flex w-full h-[4rem] items-center gap-[.5rem]">
        <div className="w-[2.3rem] h-full flex items-center">
          <FaRegBuilding className="text-[2.2rem]" />
        </div>
        <div className="w-[calc(100%-2.6rem)]">
          <h2 className="text-[1.2rem] font-[600]">{name}</h2>
          <p className="text-[.8rem] line-clamp-1 w-full overflow-hidden text-gray-600">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <p className="flex gap-[.3rem] items-center">
          Created by:
          <span className="px-[.5rem] py-[.1rem] border bg-gray-100 hover:bg-gray-200 rounded-full text-[.7rem]">
            {createdBy?.name || "Admin"}
          </span>
        </p>
      </div>

      {/* Hover actions */}
      <div className="absolute top-[.5rem] hidden gap-[.3rem] right-[.3rem] group-hover:flex">
        <div
          onClick={handleEdit} // Fixed: Call the function
          title="edit"
          className="rounded-full shadow-none text-black border bg-gray-100 size-[1.5rem] flex justify-center items-center hover:bg-gray-200 duration-300"
        >
          <MdModeEdit className="text-[.8rem]" />
        </div>
        <div
          onClick={handleDelete} // Fixed: Call the function
          title="delete"
          className="rounded-full shadow-none text-black border bg-red-100 size-[1.5rem] flex justify-center items-center hover:bg-red-200 duration-300"
        >
          <MdDeleteForever className="text-red-500 text-[.8rem]" />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
