import { PropsWithChildren, useState } from "react";
import Navbar from "../Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex items-center justify-center">{children}</main>
    </>
  );
};
export default Layout;
