"use client";

import { LogoImage } from "@/assets/assetManger";
import Image from "../custom/Image";

import React from "react";
import { Link, useLocation } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { pathname } = location;
  // console.log("current location", pathname);

  return (
    <div className=" w-[100%] min-h-[100vh] relative font-openSans   ">
      <div className=" w-full sticky h-[4rem] top-0 bg-white  flex justify-between px-16 border-b-2 shadow-sm  ">
        <div className="  top-4  flex items-center gap-[.5rem]  ">
          <Image src={LogoImage} alt="ASQI" className="  w-[7.5rem]    " />
        </div>
        <div className="  flex justify-center items-center  font-poppins text-[1.1rem]   ">
          {pathname.endsWith("register") ? (
            <Link to={"/auth/login"} className=" mx-auto ">
              Login
            </Link>
          ) : (
            <Link to={"/auth/register"}>Register</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
