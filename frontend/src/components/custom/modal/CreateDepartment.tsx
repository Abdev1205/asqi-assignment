import React from "react";
import Modal from ".";
import { ChildModalProps } from ".";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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
import { MdClose } from "react-icons/md";
import { ApiUrl } from "@/utils/baseUrl";
import api from "@/utils/api";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters long" }),
});

const CreateDepartment: React.FC<ChildModalProps> = ({
  visible,
  onClose = () => {},
  callback = () => {},
  focusMode = false,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post(`${ApiUrl}/api/department`, data, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Department created successfully!");
        form.reset();
        callback();
        onClose();
        window.location.reload();
      } else {
        toast.error(`Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      callback={callback}
      focusMode={focusMode}
    >
      <div className=" relative w-[40rem] p-8 bg-white  rounded-[.4rem] overflow-y-auto overflow-x-hidden ">
        <div
          onClick={() => onClose()}
          className=" absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[.5rem] top-[.5rem] border-primary shadow-md hover:text-white hover:bg-primary hover:border-white cursor-pointer "
        >
          <MdClose className=" text-[1.3rem] " />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[1rem] "
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
              Create Department
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateDepartment;
