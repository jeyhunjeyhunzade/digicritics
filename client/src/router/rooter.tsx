import { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "@app/pages/Homepage";
import AuthPage from "@app/pages/auth/AuthPage";
import ReviewPage from "@app/pages/ReviewPage";
import ProfilePage from "@app/pages/ProfilePage";
import RouterErrorPage from "@app/router/RouterErrorPage";
import { checkAuth } from "@app/utils";

export enum Routes {
  auth = "/auth",
  homepage = "/",
  profile = "/profile",
  reviewpage = "/review",
  reviewById = "/review/:id",
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
    path: Routes.auth,
    element: <AuthPage />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.homepage,
    element: <Homepage />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.reviewById,
    element: <ReviewPage />,
    errorElement: <RouterErrorPage />,
  },
  {
    path: Routes.profile,
    element: <ProfilePage />,
    errorElement: <RouterErrorPage />,
  },
]);
