import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Assumes you're using a library like Radix-UI or similar for the combobox.
import { toast } from "react-toastify";
import api from "@/utils/api";

import useDepartment from "@/hooks/useDepartment";
import { Department } from "@/types/Department";

type LocalDepartmentType = {
  _id: string;
  name: string;
};

const DepartmentSelect = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  const { currentDepartment } = useDepartment();

  console.log("currentDepartment - >", currentDepartment);

  const [selectedDepartment, setSelectedDepartment] =
    useState<LocalDepartmentType | null>(() => {
      try {
        const storedDepartment = localStorage.getItem("selectedDepartment");
        return storedDepartment ? JSON.parse(storedDepartment) : null;
      } catch (error) {
        console.error(
          "Failed to parse selected department from localStorage:",
          error
        );
        return null;
      }
    });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get(`/api/department`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const fetchedDepartments = response?.data?.data || [];
          setDepartments(fetchedDepartments);

          // If no department is selected in localStorage, default to the first department
          if (!selectedDepartment && fetchedDepartments.length > 0) {
            const defaultDepartment = {
              _id: fetchedDepartments[0]._id,
              name: fetchedDepartments[0].name,
            };
            setSelectedDepartment(defaultDepartment);
            localStorage.setItem(
              "selectedDepartment",
              JSON.stringify(defaultDepartment)
            );
            toast.info(`Default Department: ${defaultDepartment.name}`);
          }
        } else {
          toast.error("Failed to fetch departments.");
        }
      } catch (error) {
        toast.error("Error fetching departments.");
      }
    };

    fetchDepartments();
  }, [selectedDepartment]);

  const handleSelect = (id: string) => {
    const selected = departments.find((dept) => dept._id === id);
    if (selected) {
      const departmentObject = { _id: selected._id, name: selected.name };
      setSelectedDepartment(departmentObject);
      localStorage.setItem(
        "selectedDepartment",
        JSON.stringify(departmentObject)
      );
      toast.success(`Selected Department: ${selected.name}`);
      window.location.reload();
    }
  };

  return (
    <div className="w-full mb-[1rem] ">
      <Select
        value={selectedDepartment?._id || undefined}
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-full border shadow-sm border-primary rounded-[.3rem] focus:ring-primary  ">
          <SelectValue placeholder="Choose a department">
            {selectedDepartment?.name || "Choose a department"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept._id} value={dept._id}>
              {dept.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DepartmentSelect;
