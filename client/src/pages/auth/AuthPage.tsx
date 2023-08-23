import { createAccount, loginAccount } from "@app/api/auth";
import FbIcon from "@app/assets/icons/FbIcon";
import GoogleIcon from "@app/assets/icons/GoogleIcon";
import Layout from "@app/components/Layout";
import { queryClient } from "@app/index";
import { Routes } from "@app/router/rooter";
import { errorHandler, successHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { mutate: createAccountMutate, isLoading: isCreateAccountLoading } =
    useMutation(createAccount, {
      onSuccess: (response) => {
        localStorage.setItem("token", response.token);
        successHandler(response);
        navigate(Routes.homepage);
      },
      onError: errorHandler,
    });

  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
    loginAccount,
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        // queryClient.invalidateQueries([["users"]]);
        navigate(Routes.homepage);
      },
      onError: errorHandler,
    }
  );

  const isLoading = isCreateAccountLoading || isLoginLoading;

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !name) {
      return toast.error("please fill the all fields");
    } else if (password !== confirmPassword) {
      return toast.error("passwords do not match");
    }

    createAccountMutate({
      email,
      password,
      name,
    });
  };

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("please fill the all fields");
    }

    loginMutate({
      password,
      email,
    });
  };

  return (
    <Layout>
      <div className="flex w-full">
        <div className="flex h-[90vh] w-[50%] items-center justify-center bg-gradientBlue">
          <div className="flex flex-col px-[50px]">
            <div className="mb-4 text-left text-4xl font-semibold text-white">
              Digicritics: Unveiling the Art of Review
            </div>
            <div className="box-shadow-customBlue h-[306px] w-[619px] rounded-br-[100px] bg-[#045C7E] px-6 py-7">
              <div className="mb-6 text-left text-4xl tracking-[19.2px]">
                ⭐⭐⭐⭐⭐️
              </div>
              <div className="text-left text-xl text-white	">
                "Discover our immersive realm of reviews! Delve into captivating
                critiques of games, movies, books, and more. Uncover expertly
                crafted insights and thoughtful opinions that guide you through
                the vast universe of entertainment. Join us on this journey of
                discovery and make informed choices for your next adventure!"
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[90vh] w-[50%] items-center justify-center dark:bg-[#1B1B1B]">
          <div className="flex flex-col ">
            <div className="mb-6 text-6xl font-semibold text-[#006F9C]">
              {isSignUp ? t("Auth.signUp") : t("Navbar.login")}
            </div>
            {isSignUp && (
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {t("Auth.name")}
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("Auth.namePlaceholder")}
                    value={name}
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                    required
                    className="block h-[48px] w-[368px] rounded-md border-0 bg-[transparent] py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-[#636060] focus:ring-2 focus:ring-inset dark:placeholder:text-[#9D9D9D] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {t("Auth.email")}
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("Auth.emailPlaceholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                  autoComplete="email"
                  required
                  className="block h-[48px] w-[368px] rounded-md border-0 bg-[transparent] py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-[#636060] focus:ring-2 focus:ring-inset dark:placeholder:text-[#9D9D9D]  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mb-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >
                  {t("Auth.password")}
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("Auth.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  required
                  className="block h-[48px] w-[368px] rounded-md border-0 bg-[transparent] py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#636060] focus:ring-2 focus:ring-inset dark:placeholder:text-[#9D9D9D]  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {isSignUp && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="passwordAgain"
                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {t("Auth.passwordConfirm")}
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="passwordAgain"
                    name="passwordAgain"
                    type="password"
                    placeholder={t("Auth.passwordConfirmPlaceholder")}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.currentTarget.value);
                    }}
                    required
                    className="block h-[48px] w-[368px] rounded-md border-0 bg-[transparent] py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-[#636060] focus:ring-2 focus:ring-inset dark:placeholder:text-[#9D9D9D]  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  isSignUp ? handleSignUp() : handleLogin();
                }}
                disabled={isLoading}
                className="flex h-[48px] w-full items-center justify-center rounded-md bg-gradientBtnBlue px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSignUp ? t("Auth.signUp") : t("Navbar.login")}
              </button>
            </div>
            <div className="my-6 flex justify-between">
              <hr className="h-px w-[40%] self-center border-0 bg-gray-200 dark:bg-[#DEDEDEED]" />
              <div className="flex dark:text-[#9D9D9D]">{t("Auth.or")}</div>
              <hr className="h-px w-[40%] self-center border-0 bg-gray-200 dark:bg-[#DEDEDEED]" />
            </div>
            <div className="flex justify-center">
              <div className="mr-[30px] cursor-pointer rounded-[6.545px] border-2 border-gray-300 px-[9px] py-2">
                <GoogleIcon />
              </div>
              <div className="cursor-pointer rounded-[6.545px] border-2 border-gray-300 px-[9px] py-2">
                <FbIcon />
              </div>
            </div>
            {isSignUp ? (
              <div className="mt-6 flex justify-center">
                <div className="mr-2 text-[#2C2C2C] dark:text-white">
                  {t("Auth.alreadyHaveAccount")}
                </div>
                <div
                  role="buton"
                  tabIndex={0}
                  className="cursor-pointer font-semibold text-[#006F9C]"
                  onClick={() => setIsSignUp(false)}
                >
                  {t("Navbar.login")}
                </div>
              </div>
            ) : (
              <div className="mt-6 flex justify-center">
                <div className="mr-2 text-[#2C2C2C] dark:text-white">
                  {t("Auth.notHaveAccount")}
                </div>
                <div
                  role="buton"
                  tabIndex={0}
                  className="cursor-pointer font-semibold text-[#006F9C]"
                  onClick={() => setIsSignUp(true)}
                >
                  {t("Auth.signUp")}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
