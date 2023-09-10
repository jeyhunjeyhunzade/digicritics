import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createAccount } from "@app/api/auth";
import { getUserByEmail } from "@app/api/users";
import Loader from "@app/components/Loader";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import useLogout from "@app/hooks/useLogout";
import { queryClient } from "@app/index";
import { Routes } from "@app/router/rooter";
import { AuthAction, UserStatus } from "@app/types/enums";
import { AppContextShape } from "@app/types/types";
import { errorHandler, successHandler } from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { AppContext } from "../App";

const LoginCallBack = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { onError } = useError();
  const { config } = useGetConfig();
  const { handleLogout } = useLogout();
  const { setLoggedUser, setLoggedUserId } = useContext(
    AppContext
  ) as AppContextShape;

  const { mutate: createAccountMutate, isLoading: isCreateAccountLoading } =
    useMutation(createAccount, {
      onSuccess: (response) => {
        setLoggedUser(response.newUser);
        setLoggedUserId(response.newUser.id);
        localStorage.setItem("loggedUserId", response.newUser.id);
        queryClient.invalidateQueries(["userById"]);
        queryClient.invalidateQueries(["users"]);
        successHandler(response);
        navigate(Routes.homepage);
      },
      onError: errorHandler,
    });

  const { mutate: getUserByEmailMutate } = useMutation(getUserByEmail, {
    onSuccess: (response) => {
      if (response.action === AuthAction.REGISTER_REQUIRED) {
        if (user?.email)
          createAccountMutate({
            email: user.email,
            name: user.name,
            profileImage: user.picture,
          });
      } else {
        if (response.status === UserStatus.BLOCKED) {
          toast.error(t("Loader.blocked"));
          setTimeout(() => {
            handleLogout();
          }, 2000);
        } else {
          setLoggedUserId(response.id);
          localStorage.setItem("loggedUserId", response.id);
          queryClient.invalidateQueries(["userById"]);
          queryClient.invalidateQueries(["users"]);
          navigate(Routes.homepage);
        }
      }
    },
    onError,
  });

  useEffect(() => {
    if (user?.email && user?.name && config) {
      getUserByEmailMutate({
        email: user.email,
        config,
      });
    }
  }, [user, config]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-10 bg-gradientBlue">
      <div className="text-3xl font-semibold text-white">
        {`${t("Loader.wait")}...`}
      </div>
      <Loader />
    </div>
  );
};

export default LoginCallBack;
