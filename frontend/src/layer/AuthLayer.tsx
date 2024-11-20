import React, { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSession from "@/hooks/useSession";
import AppLayout from "@/components/layout/AppLayout";
import ConfigProvider from "@/provider/ConfigProvider";

interface AuthLayerProps {
  children: ReactNode;
}

const AuthLayer: React.FC<AuthLayerProps> = ({ children }) => {
  const { loading, loggedIn } = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ["/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (!loading && !loggedIn && !isPublicRoute) {
      navigate("/auth/login");
    }
  }, [loading, loggedIn, isPublicRoute, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loggedIn && !isPublicRoute) {
    return null;
  }

  return (
    <>
      {/* <ConfigProvider> */}
      <AppLayout>{children}</AppLayout>
      {/* </ConfigProvider> */}
    </>
  );
};

export default AuthLayer;
