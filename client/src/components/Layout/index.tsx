import { PropsWithChildren, createContext, useState } from "react";
import Navbar from "../Navbar";
import { AppContextShape } from "@app/types/types";

export const AppContext = createContext<AppContextShape | null>(null);

const Layout = ({ children }: PropsWithChildren) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <header>
        <Navbar />
      </header>
      <main className="flex items-center justify-center">{children}</main>
    </AppContext.Provider>
  );
};
export default Layout;
