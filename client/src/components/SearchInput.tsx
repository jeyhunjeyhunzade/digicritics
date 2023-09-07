import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getFullTextSearch } from "@app/api/reviews";
import SearchIcon from "@app/assets/icons/SearchIcon";
import useDebounce from "@app/hooks/useDebounce";
import { Routes } from "@app/router/rooter";
import { ReviewsData } from "@app/types/types";
import { classNames, errorHandler, shortenString } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import SearchBarSpinner from "./SearchBarSpinner";

const SearchInput = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedInputValue = useDebounce(searchQuery, 500);
  const [results, setResults] = useState<ReviewsData[]>([]);

  const { mutate: searchReviewMutate, isLoading: isSearchReviewLoading } =
    useMutation(getFullTextSearch, {
      onSuccess: (response) => {
        console.log("response: ", response);
        setResults(response);
      },
      onError: errorHandler,
    });

  useEffect(() => {
    debouncedInputValue && searchReviewMutate(debouncedInputValue);
  }, [debouncedInputValue]);

  const closeOnEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  const closeOnClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.id === "small-modal") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", closeOnEsc);
      document.addEventListener("click", closeOnClickOutside);
    } else {
      document.removeEventListener("keydown", closeOnEsc);
      document.removeEventListener("click", closeOnClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
      document.removeEventListener("click", closeOnClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="relative z-[100] mr-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsModalOpen(true);
          }}
          placeholder={t("Navbar.search")}
          className="border-0 border-b-2 border-white bg-[transparent] px-0 py-2 pr-10 text-white placeholder-white outline-none focus:border-white focus:outline-none focus:ring-0"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <SearchIcon size={24} color={"white"} />
        </div>
      </div>
      <div
        id="small-modal"
        tabIndex={-1}
        className={`ease absolute z-50 transition-all duration-300 ${
          isModalOpen ? "block" : "hidden"
        } h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden md:inset-0`}
      >
        <div className="relative left-[62%] top-[8%] h-[444px] w-[520px] overflow-y-scroll rounded-[16px] bg-white px-6 py-3 shadow-searchModalShadow dark:bg-[#2C2C2C]">
          {isSearchReviewLoading ? (
            <div className="flex flex-col">
              <div className="border-b border-solid border-[#EFEFEF]">
                <SearchBarSpinner />
              </div>
              <SearchBarSpinner />
            </div>
          ) : results.length ? (
            results.map((result, i) => (
              <Link key={result.id} to={`${Routes.reviewpage}/${result.id}`}>
                <div
                  className={classNames(
                    "flex flex-col py-4",
                    i !== results.length - 1
                      ? "border-b border-solid border-[#EFEFEF] dark:border-[#646363]"
                      : null
                  )}
                >
                  <div className="flex-start mb-2 flex w-full text-sm font-semibold text-[#000] dark:text-white">
                    {shortenString(result.reviewTitle, 30)}
                  </div>
                  <div className="mb-2 flex w-full justify-between">
                    <div className="w-[350px] flex-wrap self-center text-left text-sm font-medium text-[#717171] dark:text-[#DBDBDB]">
                      {shortenString(result.reviewContent, 140)}
                    </div>
                    <div
                      style={{
                        backgroundImage: `url(${result.reviewImages[0]})`,
                      }}
                      className={`h-[72px] w-[100px] rounded-[8px] bg-cover bg-center`}
                    ></div>
                  </div>
                  <div className="flex w-full">
                    <div
                      style={{
                        backgroundImage: `url(${result.user.profileImage})`,
                      }}
                      className={`h-[20px] w-[20px] rounded-[20px] bg-cover bg-center`}
                    ></div>
                    <div className="ml-2 self-center text-xs	text-[#989292] dark:text-[#DBDBDB]">
                      {result.user.fullName}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-2xl	font-semibold text-[#717171]">
                {t("Navbar.nothingFound")}
              </div>
            </div>
          )}
          {}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
