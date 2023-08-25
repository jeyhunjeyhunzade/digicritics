import SearchIcon from "@app/assets/icons/SearchIcon";
import { useTranslation } from "react-i18next";

const SearchInput = () => {
  const { t } = useTranslation();

  return (
    <div className="relative mr-6">
      <input
        type="text"
        placeholder={t("Navbar.search")}
        className="border-0 border-b-2 border-white bg-[transparent] px-0 py-2 pr-10 text-white placeholder-white outline-none focus:border-white focus:outline-none focus:ring-0"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <SearchIcon size={24} color={"white"} />
      </div>
    </div>
  );
};

export default SearchInput;
