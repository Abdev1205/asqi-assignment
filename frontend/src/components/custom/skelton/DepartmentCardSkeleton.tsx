import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DepartmentCardSkeleton: React.FC = () => {
  return (
    <div className="relative w-64 p-4 bg-white border rounded-[.5rem] cursor-pointer font-openSans hover:shadow-lg group">
      <div className="flex w-full h-[4rem] items-center gap-[.5rem]">
        <div className="w-[2.3rem] h-full flex items-center">
          {/* Skeleton loader for the icon */}
          <Skeleton className="w-[2.3rem] h-[2.3rem] rounded-full" />
        </div>
        <div className="w-[calc(100%-2.6rem)]">
          {/* Skeleton for department name and description */}
          <Skeleton className="h-[1.2rem] w-[70%] mb-1" />
          <Skeleton className="h-[0.8rem] w-[100%]" />
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <p className="flex gap-[.3rem] items-center">
          {/* Skeleton for "Created by" */}
          <Skeleton className="h-[1rem] w-[6rem]" />
        </p>
      </div>

      {/* Skeleton for hover actions */}
      <div className="absolute top-[.5rem] hidden gap-[.3rem] right-[.3rem] group-hover:flex">
        <div className="rounded-full shadow-none text-black border bg-gray-100 size-[1.5rem] flex justify-center items-center hover:bg-gray-200 duration-300">
          <Skeleton className="w-[1.5rem] h-[1.5rem] rounded-full" />
        </div>
        <div className="rounded-full shadow-none text-black border bg-red-100 size-[1.5rem] flex justify-center items-center hover:bg-red-200 duration-300">
          <Skeleton className="w-[1.5rem] h-[1.5rem] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default DepartmentCardSkeleton;
