import { errorHandler } from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { AxiosError } from "axios";
import useLogout from "./useLogout";

const useError = () => {
  const { handleLogout } = useLogout();
  const { isAuthenticated } = useAuth0();

  const onError = (error: unknown) => {
    if (!isAuthenticated) {
      handleLogout();
    }
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
    errorHandler(error);
  };

  return { onError };
};

export default useError;
