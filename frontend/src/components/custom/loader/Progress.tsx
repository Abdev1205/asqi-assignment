import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "nprogress/nprogress.css";
import nprogress from "nprogress";

interface ProgressProps {
  children: React.ReactNode;
}

const Progress: React.FC<ProgressProps> = ({ children }) => {
  const location = useLocation();
  nprogress.configure({
    showSpinner: false,
  });

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return <>{children}</>;
};

export default Progress;
