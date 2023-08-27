import { PropsWithChildren, useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import ReviewEditorModal from "../ReviewEditorModal";
import { useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";
import { checkJwtExpiration } from "@app/utils";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";

const Layout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isTokenExpired = checkJwtExpiration();

    if (isTokenExpired) {
      navigate(Routes.auth);
    }
  }, []);

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
