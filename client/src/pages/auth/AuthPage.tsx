import Layout from "@app/components/Layout";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

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
        <div className="flex h-[90vh] w-[50%] items-center justify-center">
          <div className="flex flex-col ">
            <div className="mb-[112px] text-6xl font-semibold text-[#006F9C]">
              {t("Navbar.login")}
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  autoComplete="email"
                  required
                  className="block h-[48px] w-[368px] rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                  required
                  className="block h-[48px] w-[368px] rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
