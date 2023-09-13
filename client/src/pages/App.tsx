import { createContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "@app/router/rooter";
import { ApiConfig, AppContextShape, LoggedUser } from "@app/types/types";
import { getLoggedUserId } from "@app/utils";

export const AppContext = createContext<AppContextShape | null>(null);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReviewEditorOpen, setIsReviewEditorOpen] = useState(false);
  const [isDeleteReviewModalOpen, setIsDeleteReviewModalOpen] = useState(false);
  const [isCategoryEditorOpen, setCategoryEditorOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(null);
  const [config, setConfig] = useState<ApiConfig>();
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const id = getLoggedUserId();

    if (id) {
      setLoggedUserId(id);
    }
  }, [loggedUser]);

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
        setLoggedUserId,
        config,
        setConfig,
        isCategoryEditorOpen,
        setCategoryEditorOpen,
        selectedReviewId,
        setSelectedReviewId,
        isDeleteReviewModalOpen,
        setIsDeleteReviewModalOpen,
        tags,
        setTags,
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
