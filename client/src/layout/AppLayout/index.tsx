import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import Loader from "@app/components/Loader";
import Navbar from "@app/components/Navbar";
import ReviewEditorModal from "@app/components/ReviewEditorModal";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuth0();
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-8 bg-gradientBlue">
          <div className="text-3xl font-semibold text-white">
            {`${t("Loader.loading")}...`}
          </div>
          <Loader />
        </div>
      ) : (
        <>
          <header>
            <Navbar />
          </header>
          <main className="flex items-center justify-center">{children}</main>
          <ReviewEditorModal />
        </>
      )}
    </>
  );
};

export default Layout;
