import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center">
      <div>{t("Login.title")}</div>
    </div>
  );
};

export default Login;
