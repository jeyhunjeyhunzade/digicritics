import { router } from "@app/router/rooter";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { AppContextShape } from "@app/types/types";
import { createContext, useState } from "react";

export const AppContext = createContext<AppContextShape | null>(null);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isReviewEditorOpen, setIsReviewEditorOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        isReviewEditorOpen,
        setIsReviewEditorOpen,
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
