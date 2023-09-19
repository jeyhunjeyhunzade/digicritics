import { useTranslation } from "react-i18next";
import { Routes } from "@app/router/rooter";
import { useAuth0 } from "@auth0/auth0-react";

const SignupButton = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: Routes.loginCallback,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button
      className="ml-4 flex h-5 h-[32px] w-fit items-center justify-center whitespace-nowrap rounded bg-white  px-2 py-1 text-base text-[#013549]"
      onClick={handleSignUp}
    >
      {t("Navbar.signup")}
    </button>
  );
};

export default SignupButton;
