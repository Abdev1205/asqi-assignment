import api from "@/utils/api";
import { useEffect, useState } from "react";
import DepartmentCard from "@/components/custom/card/DepartmentCard";
import DeleteDepartment from "@/components/custom/modal/DeleteDepartment";
import EditDepartment from "@/components/custom/modal/EditDepartment";
import DepartmentCardSkeleton from "@/components/custom/skelton/DepartmentCardSkeleton";
import useSession from "@/hooks/useSession";
import type { Department } from "@/types/Department";

const Department = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [depLoad, setDepLoad] = useState(false);
  const [delDep, setDelDep] = useState(false);
  const [delId, setDelId] = useState("");
  const [editDep, setEditDep] = useState(false);
  const [editId, setEditId] = useState("");

  const { reload, setReload } = useSession();

  const getDepData = async () => {
    try {
      const response = await api.get("/api/department", {
        withCredentials: true,
      });
      setDepartments(response?.data?.data || []);
      console.log(" dep res  ", response?.data?.data);
      setDepLoad(true);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    getDepData();
  }, []);

  if (!depLoad) {
    Array(10)
      .fill(null)
      .map((_, index) => {
        return <DepartmentCardSkeleton key={index} />;
      });
  }

  return (
    <div className="flex flex-wrap gap-4 p-4 px-[2rem] ">
      <DeleteDepartment
        visible={delDep}
        onClose={() => setDelDep(false)}
        callback={() => {
          getDepData();
          setReload(!reload);
        }}
        id={delId}
      />
      <EditDepartment
        visible={editDep}
        onClose={() => setEditDep(false)}
        callback={() => {
          getDepData();
          setReload(!reload);
        }}
        id={editId}
      />
      {departments.length == 0 && !depLoad
        ? Array(15)
            .fill(null)
            .map((_, index) => {
              return <DepartmentCardSkeleton key={index} />;
            })
        : departments &&
          departments.map((department, index) => (
            <DepartmentCard
              key={index}
              department={department}
              methods={{
                deleteDep: () => {
                  setDelDep(true);
                  setDelId(department._id);
                },
                editDep: () => {
                  setEditDep(true);
                  setEditId(department._id);
                },
              }}
            />
          ))}
    </div>
  );
};

export default Department;
