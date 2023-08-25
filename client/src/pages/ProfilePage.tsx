import LinkToIcon from "@app/assets/icons/LinkToIcon";
import SearchIcon from "@app/assets/icons/SearchIcon";
import ThreeDot from "@app/assets/icons/ThreeDot";
import Layout from "@app/components/Layout";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex flex h-[90vh] w-full flex-col px-20 py-6 dark:bg-[#1B1B1B]">
        <div className="mb-10 flex w-full justify-start">
          <img
            src="/testprofile.jpeg"
            alt="profile image"
            className="h-[160px] w-[160px] rounded-[8px]"
          />
          <div className="ml-4 flex w-full justify-between">
            <div>
              <div className="mb-2 flex items-center">
                <span className="text-4xl font-medium dark:text-white">
                  Jeyhun Jeyhunzade
                </span>
                <button className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[26px] bg-[#209239] text-white ">
                  <span className="pr-2">{t("Profile.admin")}</span>
                  <LinkToIcon size={20} />
                </button>
              </div>
              <div className="mb-2 flex items-center dark:text-white">
                <table>
                  <tbody className="text-left">
                    <tr className="mb-2">
                      <td className="font-medium">{t("Profile.email")}</td>
                      <td className="pl-6 font-normal">jeyhun@mail.com</td>
                    </tr>
                    <tr className="mb-2">
                      <td className="font-medium">{t("Profile.likes")}</td>
                      <td className="pl-6 font-normal">21</td>
                    </tr>
                    <tr>
                      <td className="font-medium">{t("Profile.created")}</td>
                      <td className="pl-6 font-normal">24/08/2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <ThreeDot size={24} />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="relative mr-6">
            <input
              type="text"
              placeholder={t("ProfileTable.search")}
              className="h-[44px] w-[628px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#2C2C2C] outline-none focus:ring-0 dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <SearchIcon size={24} />
            </div>
          </div>
          <div className="h-[44px] w-[302px]">
            <select
              id="region"
              name="region"
              className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              // value={region}
              // onChange={(e) => {
              //   setRegion(e.target.value);
              // }}
            >
              <option value="">{t("Review.category")}</option>
              <option>Games</option>
              <option>Movies</option>
              <option>Sport</option>
              <option>Games</option>
              <option>Movies</option>
              <option>Sport</option>
            </select>
          </div>
          <div className="ml-6 h-[44px] w-[302px] bg-[transparent]">
            <select
              id="region"
              name="region"
              placeholder={t("ProfileTable.sortBy")}
              className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              // value={region}
              // onChange={(e) => {
              //   setRegion(e.target.value);
              // }}
            >
              <option value="">{t("ProfileTable.sortBy")}</option>
              <option>{t("ProfileTable.reviewName")}</option>
              <option>{t("ProfileTable.category")}</option>
              <option>{t("ProfileTable.createdDate")}</option>
              <option>{t("ProfileTable.authorGrade")}</option>
              <option>{t("ProfileTable.rating")}</option>
              <option>{t("ProfileTable.like")}</option>
              <option>{t("ProfileTable.actions")}</option>
            </select>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
