import { checkAuth, errorHandler } from "@app/utils";
import useLogout from "./useLogout";
import { AxiosError } from "axios";

const useError = () => {
  const { handleLogout } = useLogout();

  const onError = (error: unknown) => {
    const isAuthenticated = checkAuth();
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
