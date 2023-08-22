import WorldIcon from "@app/assets/icons/WorldIcon";
import { Languages } from "@app/types/enums";
import { checkAuth, classNames } from "@app/utils";
import { t } from "i18next";
import SearchInput from "./SearchInput";
import ToggleTheme from "./ToggleTheme";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.EN);
  const isAuthenticated = checkAuth();
  const { t, i18n } = useTranslation();
  console.log("isAuthenticated: ", isAuthenticated);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (language: Languages) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setIsMenuOpen(false);
  };
  return (
    <nav className="mb-9 flex h-20 items-center justify-end border-b-2 border-b-zinc-200 bg-[#013549] px-20">
      <div className="flex w-[30%] text-4xl font-semibold text-white">
        Digicritics
      </div>
      <div className="flex w-[70%] items-center justify-end">
        <SearchInput />
        <ToggleTheme />
        <button
          onClick={toggleMenu}
          aria-label="Toggle Language Menu"
          className="mx-6 flex items-center focus:outline-none"
        >
          <WorldIcon />
        </button>
        {isMenuOpen && (
          <div className="absolute right-[7%]	top-[10%] mt-2 w-32 bg-white shadow-lg">
            <button
              onClick={() => handleLanguageChange(Languages.EN)}
              className={classNames(
                "flex w-full px-4 py-2 text-sm text-gray-800 focus:outline-none",
                selectedLanguage === Languages.EN
                  ? "bg-[#046085] font-semibold text-[#fff]"
                  : null
              )}
            >
              {t("Navbar.english")}
            </button>
            <button
              onClick={() => handleLanguageChange(Languages.RU)}
              className={classNames(
                "flex w-full px-4 py-2 text-sm text-gray-800 focus:outline-none",
                selectedLanguage === Languages.RU
                  ? "bg-[#046085] font-semibold text-[#fff]"
                  : null
              )}
            >
              {t("Navbar.russian")}
            </button>
          </div>
        )}
        <button
          className="mr-6 flex h-5 h-[32px] w-[80px] items-center justify-center whitespace-nowrap rounded border-2 border-white px-1 py-2 text-base text-white"
          onClick={() => console.log("log out")}
        >
          {isAuthenticated ? t("Navbar.logout") : t("Navbar.login")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
