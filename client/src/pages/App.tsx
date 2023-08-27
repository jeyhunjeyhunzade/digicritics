import { Routes, router } from "@app/router/rooter";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { AppContextShape, LoggedUser } from "@app/types/types";
import { createContext, useEffect, useState } from "react";
import { getLoggedUserId } from "@app/utils";

export const AppContext = createContext<AppContextShape | null>(null);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReviewEditorOpen, setIsReviewEditorOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);

  useEffect(() => {
    const id = getLoggedUserId();
    const currentUser = localStorage.getItem("loggedUser");

    if (id) {
      setLoggedUserId(id);
    }

    if (currentUser !== null) {
      const loggedUser = JSON.parse(currentUser);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        isReviewEditorOpen,
        setIsReviewEditorOpen,
        loggedUserId,
        loggedUser,
        setLoggedUser,
      }}
    >
      <div>
        <Toaster />
      </div>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
