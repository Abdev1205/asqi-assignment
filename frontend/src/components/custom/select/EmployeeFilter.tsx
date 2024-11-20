import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { LuListFilter } from "react-icons/lu";
import { RiCloseLargeLine } from "react-icons/ri";

interface EmployeeFilterProps {
  options: { label: string; value: string }[];
  selected: string;
  method: {
    setSelect: (filter: string) => void;
  };
}

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({
  options,
  selected,
  method,
}) => {
  const handleSelectFilter = (filter: string) => {
    method.setSelect(filter);
  };

  const handleRemoveFilter = () => {
    method.setSelect("");
  };

  return (
    <div className="flex items-center w-full ">
      {/* Filter Trigger */}
      <div className="mx-[1rem]">
        {selected && (
          <div className="flex items-center text-white">
            <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-r-[20px] border-transparent border-r-primary"></div>
            <div className="text-sm flex items-center gap-[.5rem] bg-primary w-fit px-[.4rem] py-[.3rem]">
              {`${selected}`}
              <RiCloseLargeLine
                onClick={handleRemoveFilter}
                className="text-white cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
      <Select value={selected || undefined} onValueChange={handleSelectFilter}>
        <SelectTrigger className="flex items-center gap-[.3rem] cursor-pointer bg-gray-100 p-[.3rem] px-[.5rem] rounded-[.3rem] focus:ring-0">
          <LuListFilter className="text-lg" />
          <span>Filter</span>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EmployeeFilter;
