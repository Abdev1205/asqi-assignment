import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import EmployeeFilter from "@/components/custom/select/EmployeeFilter";
import EmployeeTable from "@/components/custom/table/EmployeeTable";
import EmployeeTableSkeleton from "@/components/custom/skelton/EmployeeTableSkeleton"; // Import Skeleton
import { filterOptions } from "@/constants/filterOption";
import useDepartment from "@/hooks/useDepartment";
import type { Employee } from "@/types/Employee";
import api from "@/utils/api";
import { useLocation } from "react-router-dom";

const Employee = () => {
  const [empData, setEmpData] = useState<Employee[]>([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const { search } = useLocation();
  const { currentDepartment, isLoading: departmentLoading } = useDepartment();

  const query = new URLSearchParams(search);
  const qParam = query.get("q") || "";

  const getData = useCallback(
    debounce(
      async (
        sanitizedQ: string,
        filter: string,
        departmentId: string | undefined
      ) => {
        if (!departmentId) return;
        try {
          setEmpLoading(true);
          const res = await api.get(
            `/api/employees?q=${encodeURIComponent(
              sanitizedQ
            )}&filter=${filter}&departmentId=${departmentId}`,
            { withCredentials: true }
          );
          setEmpData(res?.data?.data || []);
        } catch (error) {
          console.error("Error fetching employees: ", error);
        } finally {
          setEmpLoading(false);
        }
      },
      500
    ),
    []
  );

  useEffect(() => {
    if (departmentLoading) return;
    const sanitizedQ = qParam.trim();
    getData(sanitizedQ, selectedFilter, currentDepartment?._id);
  }, [qParam, selectedFilter, currentDepartment, departmentLoading, getData]);

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  if (departmentLoading) {
    return (
      <p className="text-center text-gray-500">Loading department data...</p>
    );
  }

  return (
    <div className="flex flex-col px-[2rem] w-full h-full overflow-y-auto font-openSans">
      <div className="flex justify-between mt-[2rem]">
        <div className="flex gap-[.3rem] items-center">
          <h2 className="text-[1.5rem] font-[600]">Employees</h2>
          <span className="p-[.2rem] px-[.3rem] text-orange-800 bg-orange-100 rounded-full text-[.7rem]">
            {empData.length || 0}
          </span>
        </div>

        <div>
          <EmployeeFilter
            options={filterOptions}
            selected={selectedFilter}
            method={{
              setSelect: handleFilterSelect,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col mt-[2rem]">
        {empLoading ? (
          <EmployeeTableSkeleton />
        ) : empData.length > 0 ? (
          <EmployeeTable
            data={empData}
            isLoading={empLoading}
            methods={{
              refresh: () =>
                getData(qParam.trim(), selectedFilter, currentDepartment?._id),
              delete: () => {},
              edit: () => {},
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default Employee;
