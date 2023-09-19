import { useTranslation } from "react-i18next";
import { Routes } from "@app/router/rooter";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: Routes.loginCallback,
      },
    });
  };

  return (
    <button
      className="flex h-5 h-[32px] w-fit items-center justify-center whitespace-nowrap rounded border-2 border-white px-2 py-1 text-base text-white"
      onClick={handleLogin}
    >
      {t("Navbar.login")}
    </button>
  );
};

export default LoginButton;
