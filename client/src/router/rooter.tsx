import { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "@app/pages/Homepage";
import AuthPage from "@app/pages/auth/AuthPage";
import RouterErrorPage from "@app/router/RouterErrorPage";
import { checkAuth } from "@app/utils";

export enum Routes {
  homepage = "/",
  auth = "/auth",
}

interface PrivateRoute {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRoute) => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export const router = createBrowserRouter([
  {
    path: Routes.homepage,
    element: <Homepage />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.auth,
    element: <AuthPage />,
  },
]);
