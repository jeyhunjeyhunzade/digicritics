import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "@app/api/users";
import AvatarIcon from "@app/assets/icons/AvatarIcon";
import WorldIcon from "@app/assets/icons/WorldIcon";
import useCurrentPath from "@app/hooks/useCurrentPath";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import useLogout from "@app/hooks/useLogout";
import { AppContext } from "@app/pages/App";
import { Routes } from "@app/router/rooter";
import { Languages, UserStatus } from "@app/types/enums";
import { AppContextShape } from "@app/types/types";
import { classNames, shorteningFullName } from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import LoginButton from "./LoginButton";
import SearchInput from "./SearchInput";
import SignupButton from "./SignupButton";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const { onError } = useError();
  const navigate = useNavigate();
  const { config } = useGetConfig();
  const currentPath = useCurrentPath();
  const { t, i18n } = useTranslation();
  const { handleLogout } = useLogout();
  const { isAuthenticated } = useAuth0();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(Languages.EN);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const {
    setCategoryEditorOpen,
    setIsReviewEditorOpen,
    isDarkMode,
    loggedUserId,
    loggedUser,
    setLoggedUser,
  } = useContext(AppContext) as AppContextShape;

  const { data: userByIdData, isLoading: isUserByIdLoading } = useQuery<any>(
    ["userById", loggedUserId, config],
    () => {
      if (loggedUserId && config) {
        return getUserById({ id: loggedUserId, config });
      } else {
        return null;
      }
    },
    {
      onError,
      retry: false,
    }
  );

  const handleLanguageChange = (language: Languages) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
    setIsLangModalOpen(false);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  const closeLanguageModal = () => {
    setIsLangModalOpen(false);
  };

  const toggleLanguageModal = () => {
    setIsLangModalOpen(!isLangModalOpen);
  };

  const watchUserRole = () => {
    const savedRole = localStorage.getItem("status");
    const actualRole = userByIdData.status;

    if (savedRole !== actualRole) {
      localStorage.setItem("status", actualRole);
    }

    if (actualRole !== UserStatus.ADMIN && currentPath === Routes.adminpage) {
      navigate(Routes.homepage);
    }
  };

  useEffect(() => {
    if (userByIdData) {
      setLoggedUser(userByIdData);
      watchUserRole();
    }
  }, [userByIdData]);

  const customProfileModalStyles = {
    content: {
      padding: "0px",
      width: "150px",
      height: "fit-content",
      top: "8%",
      left: "88%",
      border: "none",
      backgroundColor: isDarkMode ? "#2C2C2C" : "white",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    overlay: {
      backgroundColor: "transparent",
    },
  };

  const customLanguagesModalStyles = {
    content: {
      padding: "0px",
      width: "150px",
      height: "fit-content",
      top: "9%",
      left: "80%",
      border: "none",
      backgroundColor: isDarkMode ? "#2C2C2C" : "white",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    overlay: {
      backgroundColor: "transparent",
    },
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
          onClick={toggleLanguageModal}
          aria-label="Toggle Language Menu"
          className="mx-6 flex items-center focus:outline-none"
        >
          <WorldIcon />
        </button>

        {isAuthenticated ? (
          <>
            <div className="mr-2 flex flex-col">
              <div className="text-sm text-white">
                {loggedUser && shorteningFullName(loggedUser?.fullName)}
              </div>
              <div className="text-right	text-xs text-white">
                {loggedUser?.status === UserStatus.ADMIN
                  ? t("Navbar.admin")
                  : t("Navbar.user")}
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="cursor-pointer"
              onClick={toggleProfileModal}
              onKeyDown={toggleProfileModal}
              aria-label="Toggle Profile Menu"
            >
              {loggedUser?.profileImage ? (
                <img
                  src={loggedUser?.profileImage}
                  alt="profile"
                  className="h-[32px] w-[32px] rounded-[32px]"
                />
              ) : (
                <AvatarIcon size={32} />
              )}
            </div>
          </>
        ) : (
          <>
            <LoginButton />
            <SignupButton />
          </>
        )}
      </div>
      <Modal
        isOpen={isLangModalOpen}
        onRequestClose={closeLanguageModal}
        style={customLanguagesModalStyles}
      >
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
      </Modal>
      <Modal
        isOpen={isProfileModalOpen}
        onRequestClose={closeProfileModal}
        style={customProfileModalStyles}
      >
        <button
          onClick={() => navigate(`${Routes.profile}/${loggedUserId}`)}
          className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
        >
          {t("Navbar.profile")}
        </button>
        {loggedUser?.status === UserStatus.ADMIN && (
          <>
            <button
              onClick={() => navigate(Routes.adminpage)}
              className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
            >
              {t("Navbar.adminPage")}
            </button>
            <button
              onClick={() => {
                setCategoryEditorOpen(true);
                setIsReviewEditorOpen(false);
                setIsProfileModalOpen(false);
              }}
              className="delay-30 flex w-full px-4 py-2 text-sm text-gray-800 transition ease-in hover:bg-[#046085] hover:text-white focus:outline-none dark:text-white"
            >
              {t("Navbar.categoryEditor")}
            </button>
          </>
        )}
        <button
          onClick={() => {
            setIsReviewEditorOpen(true);
            setIsProfileModalOpen(false);
          }}
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
      </Modal>
    </nav>
  );
};

export default Navbar;
