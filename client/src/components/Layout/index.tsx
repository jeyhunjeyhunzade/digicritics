import { PropsWithChildren, useState } from "react";
import Navbar from "../Navbar";
import ReviewEditorModal from "../ReviewEditorModal";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex items-center justify-center">{children}</main>
      <ReviewEditorModal />
    </>
  );
};
export default Layout;
