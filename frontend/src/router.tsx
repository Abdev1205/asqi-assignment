import { createBrowserRouter } from "react-router-dom";
import ConfigProvider from "./provider/ConfigProvider";
import LoginPage from "./pages/Login";
import AuthLayout from "./components/layout/AuthLayout";
import RegisterPage from "./pages/Register";
import AuthLayer from "./layer/AuthLayer";
import Roles from "./pages/Roles";
import Profile from "./pages/Profile";
import Department from "./pages/Department";
import Employee from "./pages/Employee";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: (
      <ConfigProvider>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </ConfigProvider>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <ConfigProvider>
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      </ConfigProvider>
    ),
  },
  {
    path: "/",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Employee />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/roles",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Roles />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/profile",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Profile />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/department",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Department />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/employees",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Employee />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/payroll",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Employee />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/reports",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Employee />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
  {
    path: "/settings",
    element: (
      <ConfigProvider>
        <AuthLayer>
          <Employee />
        </AuthLayer>
      </ConfigProvider>
    ),
  },
]);

export default router;
