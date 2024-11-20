import React from "react";
import Progress from "@/components/custom/loader/Progress";
import { ToastContainer } from "react-toastify";

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <>
      <Progress>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </Progress>
    </>
  );
};

export default ConfigProvider;
