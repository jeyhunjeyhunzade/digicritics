import { useTranslation } from "react-i18next";
import Loader from "@app/components/Loader";

const AuthCallback = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-10 bg-gradientBlue">
      <div className="text-3xl font-semibold text-white">
        {`${t("Loader.wait")}...`}
      </div>
      <Loader />
    </div>
  );
};

export default AuthCallback;
