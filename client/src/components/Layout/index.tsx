import { PropsWithChildren, useState } from "react";
import Navbar from "../Navbar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main className="flex items-center justify-center">{children}</main>
    </div>
  );
};
export default Layout;
