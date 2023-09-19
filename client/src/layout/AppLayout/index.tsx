import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import CategoryEditorModal from "@app/components/CategoryEditorModal";
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
        <div className="h-full">
          <header>
            <Navbar />
          </header>
          <main className="flex h-fit items-center justify-center">
            {children}
          </main>
          <ReviewEditorModal />
          <CategoryEditorModal />
        </div>
      )}
    </>
  );
};

export default Layout;
