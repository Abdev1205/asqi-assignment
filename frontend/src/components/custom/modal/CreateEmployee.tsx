import React from "react";
import Modal from ".";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useDepartment from "@/hooks/useDepartment";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  address: z.string().optional(),
});

interface CreateEmployeeProps {
  visible: boolean;
  onClose: () => void;
  callback: () => void;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({
  visible,
  onClose,
  callback,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const { currentDepartment } = useDepartment();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post(
        `/api/employees/${currentDepartment?._id}`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response) {
        toast.success("Employee created successfully!");
        form.reset();
        onClose();
        callback();
      }
    } catch (error) {
      toast.error("An error occurred while creating the employee.");
    }
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="relative w-[40rem] p-8 bg-white rounded-[.4rem] overflow-y-auto overflow-x-hidden">
        <div
          onClick={onClose}
          className="absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[.5rem] top-[.5rem] border-primary shadow-md hover:text-white hover:bg-primary hover:border-white cursor-pointer"
        >
          <MdClose className="text-[1.3rem]" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[1rem]"
          >
            {/* Employee Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Employee Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter employee name"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter employee email"
                      {...field}
                      className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Employee Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1rem] font-[400]">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter employee address"
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
              className="rounded-[.2rem] bg-primary hover:bg-primary/85 font-[500] font-poppins py-[1.3rem]"
            >
              Create Employee
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateEmployee;
