import { PropsWithChildren } from "react";
import Loader from "@app/components/Loader";
import Navbar from "@app/components/Navbar";
import ReviewEditorModal from "@app/components/ReviewEditorModal";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = ({ children }: PropsWithChildren) => {
  const { isLoading } = useAuth0();

  return (
    <>
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradientBlue">
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
