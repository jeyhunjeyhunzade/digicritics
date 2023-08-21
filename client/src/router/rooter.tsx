import { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@app/pages/App";
import Login from "@app/pages/auth/Login";
import Signup from "@app/pages/auth/Signup";
import RouterErrorPage from "@app/router/RouterErrorPage";
import { checkAuth } from "@app/utils";

export enum Routes {
  homepage = "/",
  login = "/login",
  signup = "/signup",
}

interface PrivateRoute {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRoute) => {
  const isAuthenticated = checkAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: Routes.homepage,
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.login,
    element: <Login />,
  },
  {
    path: Routes.signup,
    element: <Signup />,
  },
]);
