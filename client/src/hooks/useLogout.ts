import { AppContext } from "@app/pages/App";
import { Routes } from "@app/router/rooter";
import { AppContextShape } from "@app/types/types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const { setLoggedUser, setLoggedUserId } = useContext(
    AppContext
  ) as AppContextShape;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("status");
    setLoggedUserId(null);
    setLoggedUser(null);
    navigate(Routes.auth);
  };

  return { handleLogout };
};

export default useLogout;
