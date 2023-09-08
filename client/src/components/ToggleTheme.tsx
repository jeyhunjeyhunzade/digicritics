import { useContext, useEffect } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { classNames } from "@app/utils";

const ToggleTheme = () => {
  const { isDarkMode, setIsDarkMode } = useContext(
    AppContext
  ) as AppContextShape;

  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  const savedThemeMode = localStorage.getItem("color-theme");
  const preferredOSTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const handleToggle = () => {
    themeToggleDarkIcon?.classList.toggle("hidden");
    themeToggleLightIcon?.classList.toggle("hidden");

    if (savedThemeMode) {
      if (savedThemeMode === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setIsDarkMode(false);
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setIsDarkMode(true);
      }
    }
  };

  useEffect(() => {
    if (savedThemeMode) {
      if (savedThemeMode === "dark" || preferredOSTheme) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    }
  }, []);

  return (
    <button
      id="theme-toggle"
      onClick={handleToggle}
      type="button"
      className="rounded-lg p-2.5 text-sm text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none dark:focus:ring-gray-700"
    >
      <svg
        id="theme-toggle-dark-icon"
        className={classNames("h-5 w-5", isDarkMode ? "hidden" : null)}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        id="theme-toggle-light-icon"
        className={classNames("h-5 w-5", !isDarkMode ? "hidden" : null)}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default ToggleTheme;
