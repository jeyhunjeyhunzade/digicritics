import { useContext } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { useAuth0 } from "@auth0/auth0-react";

const useLogout = () => {
  const { logout } = useAuth0();
  const { setLoggedUser, setLoggedUserId } = useContext(
    AppContext
  ) as AppContextShape;

  const handleLogout = () => {
    // logout({
    //   logoutParams: {
    //     returnTo: window.location.origin,
    //   },
    // });
    // localStorage.removeItem("loggedUserId");
    // localStorage.removeItem("status");
    // setLoggedUserId(null);
    // setLoggedUser(null);
  };

  return { handleLogout };
};

export default useLogout;
