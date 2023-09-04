import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAccount } from "@app/api/auth";
import Loader from "@app/components/Loader";
import { Routes } from "@app/router/rooter";
import { AppContextShape } from "@app/types/types";
import { errorHandler, successHandler } from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";
import { AppContext } from "./App";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
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

  useEffect(() => {
    if (user?.email && user.name) {
      createAccountMutate({
        email: user.email,
        password: "121212",
        name: user.name,
        profileImage: user.picture,
      });
    }
  }, [user]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-10 bg-gradientBlue">
      <div className="text-3xl font-semibold text-white">
        Digicritics: Unveiling the Art of Review
      </div>
      <Loader />
    </div>
  );
};

export default WelcomePage;
