import React, { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import formatDate from "@/utils/formatDate";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "@/components/custom/Image";
import { FaUserEdit } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";

import { RiCloseLargeLine } from "react-icons/ri";
import Role from "@/components/custom/label/Role";
import Department from "@/components/custom/label/Department";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("This is not a valid email."),
  address: z.string().min(1, { message: "Address is Required" }),
});

const ProfilePage = () => {
  const { user, loading, logout, reload, setReload } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: user?.address || "",
    },
  });

  useEffect(() => {
    if (!loading && user) {
      form.reset({
        name: user.name,
        email: user.email,
        address: user?.address,
      });
    }
  }, [user, loading, form, reload]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await api.put(`/api/employees`, values, {
        withCredentials: true,
      });
      setReload(!reload);
      toast.success("Profile updated successfully", {
        position: "top-center",
        autoClose: 5000,
      });
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Card className="w-[35rem] relative border shadow-lg">
          <CardHeader className="relative">
            <Skeleton className="w-28 h-28 rounded-full absolute top-[-4.5rem] left-[calc(50%-3.5rem)]" />
            <div className="mt-16">
              <Skeleton className="w-36 h-6 mx-auto mt-[2rem] mb-2" />
              <Skeleton className="w-48 h-4 mx-auto" />
            </div>
            <Skeleton className="absolute right-[1rem] top-[.5rem] w-10 h-10 rounded-full" />
            <div className="flex justify-center mt-4">
              <Skeleton className="w-24 h-6" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-[.3rem]">
              <div className="flex justify-between">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-40 h-4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-40 h-4" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-40 h-4" />
              </div>
            </div>
            {/* <div className="mt-4">
              <Skeleton className="w-full h-12 rounded-md" />
            </div> */}
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Skeleton className="w-24 h-10 rounded-md" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full font-openSans">
      <Card className="w-[35rem] relative border shadow-lg">
        <CardHeader className="relative ">
          <Image
            src={
              user?.profilePicture ||
              "https://res.cloudinary.com/dujgngjro/image/upload/v1731783000/CloudinaryDemo/neohusgtlq54yal0lg6b.webp"
            }
            alt="Profile Picture"
            className="absolute size-[7rem] rounded-full top-[-1.8rem] left-[calc(50%-3.5rem)]"
          />
          <div className="mt-16">
            <h1 className="font-openSans text-[1.05rem] font-[500] text-center mt-[2rem] text-gray-900">
              {user?.name || "Guest"}
            </h1>
            <p className="text-sm text-center text-gray-500 font-openSans">
              {user?.email || "guest@example.com"}
            </p>
          </div>
          <Button
            title={isEditing ? "Cancel" : "Edit"}
            onClick={() => setIsEditing((prev) => !prev)}
            className="absolute text-black bg-gray-100 right-[1rem] top-[.5rem] rounded-full shadow-none hover:bg-gray-200 flex justify-center items-center size-[2.5rem] p-0 "
          >
            {isEditing ? (
              <RiCloseLargeLine className=" text-[2.4rem] " />
            ) : (
              <FaUserEdit className=" mr-[-.3rem] " />
            )}
          </Button>
          <div className="flex justify-center ">
            {user && <Role role={user.role as "employee" | "admin"} />}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between font-openSans text-[1rem] font-[400] ">
            <span className="text-gray-700 ">Address:</span>
            <span className="text-gray-600 text-[1rem] ">
              {user?.address || (
                <div className=" flex text-[.9rem] gap-[.2rem] text-red-500 justify-center items-center  ">
                  <IoWarningOutline className=" text-[1rem] " />
                  No address provided
                </div>
              )}
            </span>
          </div>

          <div className="flex flex-col gap-[.5rem]  mt-[.4rem] ">
            <div className="flex justify-between">
              <span className="text-[1rem] font-medium text-gray-700">
                Account Created:
              </span>
              <span className="text-sm text-gray-600">
                {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex justify-between mt-[.4rem] ">
            <span className="text-[1rem] font-medium text-gray-700">
              Department:
            </span>
            <span className="text-sm text-gray-600">
              {user ? (
                <Department department={user.department as "hr" | "tech"} />
              ) : (
                <div className=" flex text-[.9rem] gap-[.2rem] text-red-500 justify-center items-center  ">
                  <IoWarningOutline className=" text-[1rem] " />
                  No Department Assigned
                </div>
              )}
            </span>
          </div>

          {isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 mt-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-[400]">
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[1rem] font-[400]">
                        Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your Address"
                          {...field}
                          className="font-[400] rounded-[.2rem] outline-none focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!form.formState.isValid}
                  className={`rounded-[.2rem] bg-primary hover:bg-primary/85 font-[500] font-poppins py-[1.3rem]  `}
                >
                  Update Profile
                </Button>
              </form>
            </Form>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button
            className="px-4 py-2 text-sm font-openSans font-[500] text-black border shadow-none bg-white hover:bg-black hover:text-white rounded-[.2rem]"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
