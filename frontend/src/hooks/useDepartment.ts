import { Department } from "@/types/Department";
import { useState, useEffect } from "react";

const useDepartment = () => {
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load selected department from localStorage on first load
  useEffect(() => {
    const storedDepartment = localStorage.getItem("selectedDepartment");
    if (storedDepartment) {
      setCurrentDepartment(JSON.parse(storedDepartment));
    }
    setIsLoading(false);
  }, []);

  // Listen for changes to localStorage and update the department
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "selectedDepartment") {
        const updatedDepartment = event.newValue ? JSON.parse(event.newValue) : null;
        setCurrentDepartment(updatedDepartment);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setSelectedDepartment = (department: Department) => {
    setCurrentDepartment(department);
    localStorage.setItem("selectedDepartment", JSON.stringify(department)); // Save to localStorage
  };

  return { currentDepartment, setSelectedDepartment, isLoading };
};

export default useDepartment;
