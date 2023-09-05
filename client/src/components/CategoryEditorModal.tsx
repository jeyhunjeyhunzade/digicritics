import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  createNewCategory,
  deleteCategory,
  getCategories,
} from "@app/api/reviews";
import CloseIcon from "@app/assets/icons/CloseIcon";
import DeleteIcon from "@app/assets/icons/DeleteIcon";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import { AppContext } from "@app/pages/App";
import { AppContextShape, CategoriesData, Category } from "@app/types/types";
import { errorHandler } from "@app/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "..";
import Loader from "./Loader";

const CategoryEditorModal = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const { isDarkMode, isCategoryEditorOpen, setCategoryEditorOpen } =
    useContext(AppContext) as AppContextShape;

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useQuery<CategoriesData>(["categories"], getCategories, {
      onError,
      retry: false,
    });

  const { mutate: createCategoryMutate, isLoading: isCreateCategoryLoading } =
    useMutation(createNewCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setNewCategory("");
      },
      onError: errorHandler,
    });

  const { mutate: deleteCategoryMutate, isLoading: isDeleteCategoryLoading } =
    useMutation(deleteCategory, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setNewCategory("");
      },
      onError: errorHandler,
    });

  const isLoading =
    isCategoriesLoading || isCreateCategoryLoading || isDeleteCategoryLoading;

  useEffect(() => {
    categoriesData && setCategories(categoriesData.categories);
  }, [categoriesData]);

  const closeCategoryEditorModal = () => {
    setCategoryEditorOpen(false);
    setNewCategory("");
  };

  const handleAddCategory = () => {
    if (newCategory && config) {
      createCategoryMutate({ categoryName: newCategory, config });
    }
  };

  const handleDeleteCategory = (category: string) => {
    if (category && config) {
      deleteCategoryMutate({ categoryName: category, config });
    }
  };

  const customCategoryEditorModalStyles = {
    content: {
      width: "898px",
      height: "504px",
      padding: "24px 40px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "16px",
      backgroundColor: isDarkMode ? "#2C2C2C" : "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.30)",
    },
  };

  return (
    <Modal
      isOpen={isCategoryEditorOpen}
      onRequestClose={closeCategoryEditorModal}
      style={customCategoryEditorModalStyles}
    >
      <span
        role="button"
        tabIndex={0}
        aria-label="close review editor modal"
        onClick={closeCategoryEditorModal}
        onKeyDown={closeCategoryEditorModal}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <CloseIcon size={24} />
      </span>
      <div className="flex flex-col">
        <div className="flex justify-center text-2xl text-[#2C2C2C] dark:text-white">
          {t("Navbar.categoryEditor")}
        </div>
        <div className="mt-6 flex w-[818px] flex-col">
          <input
            type="text"
            maxLength={12}
            value={newCategory}
            disabled={isLoading}
            onChange={(e) => {
              let inputValue = e.target.value.trim();
              inputValue =
                inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
              setNewCategory(inputValue);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCategory();
              }
            }}
            placeholder={t("CategoryEditor.newCategory")}
            className="mt-6 h-[48px] w-full rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
          />
          <div className="mb-10 mt-6 flex h-[200px] w-full flex-wrap overflow-y-auto rounded-lg border-2 border-dashed border-gray-300 p-4">
            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              categories.map((category, i) => (
                <div
                  key={i}
                  className="mr-4 flex h-fit w-fit rounded-[4px] bg-[#EFEFEF] px-4 py-2 dark:bg-[#3F3F3F]"
                >
                  <div className="mr-6 text-base leading-6 text-[#2c2c2c] dark:text-white">
                    {category.name}
                  </div>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="delete category"
                    onClick={() => handleDeleteCategory(category.name)}
                    onKeyDown={() => handleDeleteCategory(category.name)}
                  >
                    <DeleteIcon size={24} color={"#A3A3A3"} />
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="my-6 flex justify-end">
            <button
              onClick={closeCategoryEditorModal}
              className="flex h-[44px] w-[140px] items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] text-[#2C2C2C] dark:border-[#DEDEDE] dark:text-white"
            >
              {t("ReviewEditor.cancel")}
            </button>
            <button
              onClick={closeCategoryEditorModal}
              className="ml-4 flex h-[44px] w-[140px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
            >
              <span className="pr-2">{t("CategoryEditor.save")}</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryEditorModal;
