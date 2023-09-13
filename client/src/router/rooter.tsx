import { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth0ProviderLayout from "@app/layout/AuthProviderLayout";
import AdminPage from "@app/pages/Adminpage";
import AuthCallback from "@app/pages/Callbackpages/AuthCallback";
import LoginCallBack from "@app/pages/Callbackpages/LoginCallback";
import Homepage from "@app/pages/Homepage";
import ProfilePage from "@app/pages/Profilepage";
import ReviewPage from "@app/pages/Reviewpage";
import Tagpage from "@app/pages/Tagpage";
import RouterErrorPage from "@app/router/RouterErrorPage";
import { UserStatus } from "@app/types/enums";
import { getUserStatus } from "@app/utils";

export enum Routes {
  homepage = "/",
  profile = "/profile",
  profileById = "/profile/:id",
  adminpage = "/adminpage",
  reviewpage = "/review",
  reviewById = "/review/:id",
  reviewEditor = "/editor",
  welcomepage = "/welcome",
  callback = "/callback",
  loginCallback = "/loginCallback",
  tagpage = "/tags",
  tagpageByTag = "tags/:tagName",
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
    path: "/",
    element: <Auth0ProviderLayout />,
    children: [
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
        path: Routes.profileById,
        element: <ProfilePage />,
        errorElement: <RouterErrorPage />,
      },
      {
        path: Routes.tagpageByTag,
        element: <Tagpage />,
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
      {
        path: Routes.callback,
        element: <AuthCallback />,
        errorElement: <RouterErrorPage />,
      },
      {
        path: Routes.loginCallback,
        element: <LoginCallBack />,
        errorElement: <RouterErrorPage />,
      },
    ],
  },
]);
