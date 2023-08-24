import WorldIcon from "@app/assets/icons/WorldIcon";
import { Languages } from "@app/types/enums";
import { checkAuth, classNames } from "@app/utils";
import SearchInput from "./SearchInput";
import ToggleTheme from "./ToggleTheme";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "@app/router/rooter";

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.EN);
  const isAuthenticated = checkAuth();

  const toggleLanguageMenu = () => {
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  const toggleProfileMenu = () => {
    if (isLangMenuOpen) setIsLangMenuOpen(false);
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLanguageChange = (language: Languages) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setIsLangMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(Routes.auth);
  };

  return (
    <nav className="flex h-20 items-center justify-end bg-[#013549] px-20">
      <div className="flex w-[30%] text-4xl font-semibold text-white">
        <Link to={Routes.homepage}>Digicritics</Link>
      </div>
      <div className="flex w-[70%] items-center justify-end">
        <SearchInput />
        <ToggleTheme />
        <button
          onClick={toggleLanguageMenu}
          aria-label="Toggle Language Menu"
          className="mx-6 flex items-center focus:outline-none"
        >
          <WorldIcon />
        </button>
        {isLangMenuOpen && (
          <div className="absolute right-[7%]	top-[8%] mt-2 w-32 bg-white shadow-lg dark:bg-[#2C2C2C]">
            <button
              onClick={() => handleLanguageChange(Languages.EN)}
              className={classNames(
                "flex w-full px-4 py-2 text-sm text-gray-800 focus:outline-none dark:text-white",
                selectedLanguage === Languages.EN
                  ? "bg-[#046085] font-semibold text-white"
                  : null
              )}
            >
              {t("Navbar.english")}
            </button>
            <button
              onClick={() => handleLanguageChange(Languages.RU)}
              className={classNames(
                "flex w-full px-4 py-2 text-sm text-gray-800 focus:outline-none dark:text-white",
                selectedLanguage === Languages.RU
                  ? "bg-[#046085] font-semibold text-white"
                  : null
              )}
            >
              {t("Navbar.russian")}
            </button>
          </div>
        )}

        {isAuthenticated ? (
          <>
            <div
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={toggleProfileMenu}
              aria-label="Toggle Profile Menu"
            >
              <img
                src="/testprofile.jpeg"
                className="h-[32px] w-[32px] rounded-[32px]"
              />
            </div>
            {isProfileMenuOpen && (
              <div className="absolute right-[1%]	top-[8%] mt-2 w-32 bg-white shadow-lg dark:bg-[#2C2C2C]">
                <button
                  onClick={() => console.log("navigat to profile")}
                  className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
                >
                  {t("Navbar.profile")}
                </button>
                <button
                  onClick={() => console.log("navigate to create new review")}
                  className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
                >
                  {t("Navbar.newReview")}
                </button>
                <button
                  onClick={handleLogout}
                  className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
                >
                  {t("Navbar.logout")}
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="flex h-5 h-[32px] w-[80px] items-center justify-center whitespace-nowrap rounded border-2 border-white px-1 py-2 text-base text-white"
            onClick={() => navigate(Routes.auth)}
          >
            {t("Navbar.login")}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
