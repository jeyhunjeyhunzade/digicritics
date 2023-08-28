import { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "@app/pages/Homepage";
import AuthPage from "@app/pages/auth/AuthPage";
import ReviewPage from "@app/pages/ReviewPage";
import ProfilePage from "@app/pages/ProfilePage";
import AdminPage from "@app/pages/AdminPage";
import RouterErrorPage from "@app/router/RouterErrorPage";
import { checkAuth, getUserStatus } from "@app/utils";
import { UserStatus } from "@app/types/enums";

export enum Routes {
  auth = "/auth",
  homepage = "/",
  profile = "/profile",
  adminpage = "/adminpage",
  reviewpage = "/review",
  reviewById = "/review/:id",
  reviewEditor = "/editor",
}

interface PrivateRoute {
  children: ReactElement;
}

const PrivateAdminRoute = ({ children }: PrivateRoute) => {
  const status = getUserStatus();
  return status === UserStatus.ADMIN ? (
    children
  ) : (
    <Navigate to={Routes.homepage} />
  );
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
  {
    path: Routes.adminpage,
    element: (
      <PrivateAdminRoute>
        <AdminPage />
      </PrivateAdminRoute>
    ),
    errorElement: <RouterErrorPage />,
  },
]);
