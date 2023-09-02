import MDEditor from "@uiw/react-md-editor";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

import CloseIcon from "@app/assets/icons/CloseIcon";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import DndUploadMiltiple from "./DndUploadMultiple";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";
import { checkAuth, errorHandler, successHandler } from "@app/utils";
import { createNewReview } from "@app/api/reviews";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Routes } from "@app/router/rooter";
import toast from "react-hot-toast";
import { Category } from "@app/types/enums";

import { tags } from "@app/mock/tagsData";
import { Autocomplete, Chip, TextField } from "@mui/material";
import useLogout from "@app/hooks/useLogout";
import useError from "@app/hooks/useError";

const ReviewEditorModal = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const {
    isDarkMode,
    isReviewEditorOpen,
    setIsReviewEditorOpen,
    loggedUserId,
  } = useContext(AppContext) as AppContextShape;
  const [reviewContent, setReviewContent] = useState<any>("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewWorkName, setReviewWorkName] = useState("");
  const [reviewCategory, setReviewCategory] = useState<Category | string>();
  const [reviewGrade, setReviewGrade] = useState<number | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[] | any>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const { mutate: createNewReviewMutate, isLoading: isCreateNewReviewLoading } =
    useMutation(createNewReview, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviews"]);
        successHandler(response);
        closeReviewEditorModal();
      },
      onError,
    });

  const customReviewEditorModalStyles = {
    content: {
      width: "1280px",
      height: "695px",
      padding: "56px 80px",
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

  const previewStyles = {
    style: {
      backgroundColor: "inherit",
    },
  };

  const closeReviewEditorModal = () => {
    setIsReviewEditorOpen(false);
    resetFields();
  };

  const handleShareReview = () => {
    if (
      reviewTitle &&
      reviewWorkName &&
      reviewContent &&
      reviewGrade &&
      reviewCategory &&
      tags.length
    ) {
      if (loggedUserId) {
        createNewReviewMutate({
          reviewTitle,
          workName: reviewWorkName,
          category: reviewCategory,
          reviewGrade,
          tags: selectedTags,
          reviewContent,
          reviewImages: urls,
          //TODO: need condition for admin
          userId: loggedUserId,
        });
      }
    } else {
      toast.error(t("Toast.allRequiredFields"));
    }
  };

  const resetFields = () => {
    setReviewTitle("");
    setReviewWorkName("");
    setReviewCategory("");
    setReviewGrade(undefined);
    selectedTags([]);
    setReviewContent("");
  };

  return (
    <Modal
      isOpen={isReviewEditorOpen}
      onRequestClose={closeReviewEditorModal}
      style={customReviewEditorModalStyles}
    >
      <span
        onClick={closeReviewEditorModal}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <CloseIcon size={24} />
      </span>
      <div className="flex flex-col">
        <div className="flex justify-center text-3xl text-[#2C2C2C] dark:text-white">
          {t("ReviewEditor.title")}
        </div>
        <div className="mb-6 flex justify-between">
          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => {
              setReviewTitle(e.target.value);
            }}
            placeholder={t("ReviewEditor.reviewTitle")}
            className="mt-12 h-[48px] w-[548px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
          />
          <input
            type="text"
            value={reviewWorkName}
            onChange={(e) => {
              setReviewWorkName(e.target.value);
            }}
            placeholder={t("ReviewEditor.workName")}
            className="mt-12 h-[48px] w-[548px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
          />
        </div>
        <div className="mb-6 flex justify-between">
          <div className="flex">
            <div className="mr-3 flex">
              <div className="h-[48px] w-[262px]">
                <select
                  name="category"
                  className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:border-[#2C2C2C] dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                  value={reviewCategory}
                  onChange={(e) => {
                    setReviewCategory(e.target.value);
                  }}
                >
                  <option value="">{t("ReviewEditor.category")}</option>
                  {/* //TODO:  make it dynamic*/}
                  <option value={Category.GAMING}>{Category.GAMING}</option>
                  <option value={Category.MOVIE}>{Category.MOVIE}</option>
                  <option value={Category.ANIME}>{Category.ANIME}</option>
                  <option value={Category.TECH}>{Category.TECH}</option>
                  <option value={Category.SPORT}>{Category.SPORT}</option>
                  <option value={Category.CITIES}>{Category.CITIES}</option>
                </select>
              </div>
            </div>
            <div className="flex">
              <select
                name="reviewGrade"
                className="block h-[48px] w-[274px] rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                value={reviewGrade && reviewGrade}
                onChange={(e) => {
                  setReviewGrade(+e.target.value);
                }}
              >
                <option value="">{t("ReviewEditor.reviewGrade")}</option>
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="flex">
            {/* //TODO: get tags dynamically */}
            <Autocomplete
              className="w-[548px] outline-none focus:outline-none dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
              multiple
              limitTags={4}
              freeSolo
              options={tags}
              autoSelect
              value={selectedTags}
              renderInput={(params) => (
                //@ts-ignore
                <TextField
                  className="outline-none focus:outline-none dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                  {...params}
                  fullWidth
                  placeholder={`${t("ReviewEditor.tags")}`}
                />
              )}
              onChange={(_, value) => {
                setSelectedTags(value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <MDEditor
              value={reviewContent}
              onChange={setReviewContent}
              height={"258px"}
              className="w-[548px] dark:text-[#C2C1BE]"
              previewOptions={previewStyles}
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <div>
            <DndUploadMiltiple width={"548px"} urls={urls} setUrls={setUrls} />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            onClick={closeReviewEditorModal}
            className="flex h-[44px] w-[160px] items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] text-[#2C2C2C] dark:border-[#DEDEDE] dark:text-white"
          >
            {t("ReviewEditor.cancel")}
          </button>
          <button
            onClick={handleShareReview}
            className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
          >
            <span className="pr-2">{t("ReviewEditor.shareReview")}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewEditorModal;
