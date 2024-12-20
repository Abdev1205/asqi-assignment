import React from "react";
import Modal, { ChildModalProps } from ".";
import { MdClose } from "react-icons/md";
import DeleteLottieAnimation from "@/components/Animation/DeleteLottieAnimation";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";

interface DeleteDepartmentProps extends ChildModalProps {
  id: string; // Department ID
}

const DeleteDepartment: React.FC<DeleteDepartmentProps> = ({
  visible,
  onClose = () => {},
  callback = () => {},
  focusMode = false,
  id = "",
}) => {
  const handleDepartmentDelete = async () => {
    if (id) {
      try {
        const res = await api.delete(`/api/department/${id}`, {
          withCredentials: true,
        });
        toast.success(res?.data?.message || "Department deleted successfully!");
        onClose();
        callback();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data ||
            "Failed to delete department."
        );
      }
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      callback={callback}
      focusMode={focusMode}
    >
      <div className="flex flex-col justify-center rounded-[3rem] gap-[1rem] items-center w-[28rem] h-[27rem]">
        <div
          onClick={() => onClose()}
          className="absolute top-[-3rem] right-[-3rem] text-white bg-gray-700 hover:bg-white hover:text-black duration-300 cursor-pointer size-[2.5rem] rounded-full flex justify-center items-center text-[1.2rem]"
        >
          <MdClose />
        </div>

        <div
          className={`bg-white w-[calc(100%-.06rem)] relative h-[calc(100%-.1rem)] rounded-[.5rem] px-[2.5rem] py-[2.5rem] flex flex-col items-center justify-center gap-[2.5rem]`}
        >
          <DeleteLottieAnimation />
          <div className="flex flex-col gap-[1rem] w-[100%] mt-[0rem]">
            <p className="font-openSans font-[500] text-[.9rem] text-black text-center my-[1rem]">
              Are you sure you want to delete this department?
            </p>
            <Button
              onClick={() => handleDepartmentDelete()}
              className={` 
              flex gap-[.8rem] justify-center items-center bg-[#DC2626] hover:bg-red-400 py-[1rem] rounded-[.3rem] text-white mt-[0rem]`}
            >
              Delete Department
            </Button>
            <Button
              onClick={() => onClose()}
              className="rounded-[.3rem] mt-[.5rem] py-[.6rem] border-[1px] border-gray-700 duration-300 text-black bg-transparent hover:bg-black hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDepartment;
