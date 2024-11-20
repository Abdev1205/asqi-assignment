import React, { useEffect, useState } from "react";
import Modal from ".";
import { ChildModalProps } from ".";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { ApiUrl } from "@/utils/baseUrl";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
});

interface EditDepartmentProps extends ChildModalProps {
  id: string;
}

const EditDepartment: React.FC<EditDepartmentProps> = ({
  visible,
  onClose = () => {},
  callback = () => {},
  id,
}) => {
  const [departmentData, setDepartmentData] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Fetch department data on component mount
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await api.get(`${ApiUrl}/api/department/${id}`, {
          withCredentials: true,
        });
        console.log(response.data);
        setDepartmentData(response?.data?.data);
      } catch (error) {
        toast.error("Failed to load department data");
      }
    };

    if (id) fetchDepartmentData();
  }, [id]);

  // Reset form data when department data is available
  useEffect(() => {
    if (departmentData) {
      form.reset({
        name: departmentData.name || "",
        description: departmentData.description || "",
      });
    }
  }, [departmentData, form]);

  const handleModalClose = () => {
    onClose();
    callback();
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await api.put(`/api/department/${id}`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Department updated successfully!");
        form.reset();
        handleModalClose();
      } else {
        toast.error(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} callback={callback}>
      <div className="relative w-[40rem] p-8 bg-white rounded-[.4rem] overflow-y-auto overflow-x-hidden">
        <div
          onClick={() => onClose()}
          className="absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[.5rem] top-[.5rem] border-primary shadow-md hover:text-white hover:bg-primary hover:border-white cursor-pointer"
        >
          <MdClose className="text-[1.3rem]" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[1rem]"
          >
            {/* Department Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Department Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter department name"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Department Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter department description"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className={`rounded-[.2rem] bg-primary hover:bg-primary/85 font-[500] font-poppins py-[1.3rem]`}
            >
              Update Department
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EditDepartment;
