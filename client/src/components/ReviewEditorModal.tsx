import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import {
  createNewReview,
  editReview,
  getCategories,
  getReviewById,
  getTags,
} from "@app/api/reviews";
import CloseIcon from "@app/assets/icons/CloseIcon";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import { AppContext } from "@app/pages/App";
import {
  AppContextShape,
  CategoriesData,
  ReviewsData,
  TagsData,
} from "@app/types/types";
import { successHandler } from "@app/utils";
import { Autocomplete, Chip, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import MDEditor from "@uiw/react-md-editor";
import { queryClient } from "..";
import DndUploadMiltiple from "./DndUploadMultiple";
import Loader from "./Loader";

const ReviewEditorModal = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const {
    isDarkMode,
    isReviewEditorOpen,
    setIsReviewEditorOpen,
    loggedUserId,
    selectedReviewId,
    setSelectedReviewId,
    tags,
    setTags,
    selectedUserId,
    setSelectedUserId,
  } = useContext(AppContext) as AppContextShape;
  const [reviewContent, setReviewContent] = useState<any>("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewWorkName, setReviewWorkName] = useState("");
  const [reviewCategory, setReviewCategory] = useState("");
  const [reviewGrade, setReviewGrade] = useState<number | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const { data: tagsData, isLoading: isTagsLoading } = useQuery<TagsData>(
    ["tags"],
    getTags,
    {
      onError,
      retry: false,
    }
  );

  const { data: reviewByIdData, isLoading: isReviewByIdLoading } =
    useQuery<ReviewsData | null>(
      ["reviewById", selectedReviewId],
      () => {
        if (selectedReviewId) {
          return getReviewById(selectedReviewId);
        } else {
          return null;
        }
      },
      {
        onError,
        retry: false,
      }
    );

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useQuery<CategoriesData>(["categories"], getCategories, {
      onError,
      retry: false,
    });

  const { mutate: createNewReviewMutate, isLoading: isCreateNewReviewLoading } =
    useMutation(createNewReview, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["userById"]);
        queryClient.invalidateQueries(["tags"]);

        successHandler(response);
        closeReviewEditorModal();
      },
      onError,
    });

  const { mutate: editReviewMutate, isLoading: isEditReviewLoading } =
    useMutation(editReview, {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["userById"]);
        queryClient.invalidateQueries(["tags"]);

        successHandler(response);
        closeReviewEditorModal();
      },
      onError,
    });

  const isLoading =
    isTagsLoading ||
    isCategoriesLoading ||
    isCreateNewReviewLoading ||
    isEditReviewLoading ||
    isReviewByIdLoading;

  useEffect(() => {
    if (tagsData) {
      const tagNames = tagsData.tags.map((tag) => tag.name);
      setTags(tagNames);
    }
  }, [tagsData]);

  useEffect(() => {
    if (reviewByIdData) {
      setReviewTitle(reviewByIdData.reviewTitle);
      setReviewWorkName(reviewByIdData.workName);
      reviewByIdData.category
        ? setReviewCategory(reviewByIdData.category.name)
        : "";
      setReviewGrade(reviewByIdData.reviewGrade);

      if (reviewByIdData.tags.length) {
        const selectedTags: string[] = reviewByIdData.tags.map(
          (tag) => tag.name
        );
        selectedTags.length && setSelectedTags(selectedTags);
      }

      setReviewContent(reviewByIdData.reviewContent);
      setUrls(reviewByIdData.reviewImages);
    }
  }, [reviewByIdData]);

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
      color: isDarkMode ? "#C2C1BE" : "#000",
    },
  };

  const closeReviewEditorModal = () => {
    setIsReviewEditorOpen(false);
    setSelectedUserId(null);
    resetFields();
  };

  const handleShareReview = () => {
    if (
      reviewTitle &&
      reviewWorkName &&
      reviewContent &&
      reviewGrade &&
      reviewCategory &&
      selectedTags.length &&
      urls.length &&
      config
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
          userId: selectedUserId ? selectedUserId : loggedUserId,
          config,
        });
      }
    } else {
      toast.error(t("Toast.allRequiredFields"));
    }
  };

  const handleEditReview = () => {
    if (
      selectedReviewId &&
      reviewTitle &&
      reviewWorkName &&
      reviewContent &&
      reviewGrade &&
      reviewCategory &&
      selectedTags.length &&
      urls.length &&
      config
    ) {
      editReviewMutate({
        reviewId: selectedReviewId,
        reviewTitle,
        workName: reviewWorkName,
        category: reviewCategory,
        reviewGrade,
        tags: selectedTags,
        reviewContent,
        reviewImages: urls,
        //TODO: need condition for admin
        config,
      });
    } else {
      toast.error(t("Toast.allRequiredFields"));
    }
  };

  const resetFields = () => {
    setSelectedReviewId(null);
    setUrls([]);
    setReviewTitle("");
    setReviewWorkName("");
    setReviewCategory("");
    setReviewGrade(undefined);
    setSelectedTags([]);
    setReviewContent("");
  };

  const renderTags = (
    value: string[],
    getTagProps: ({ index }: { index: number }) => Record<string, any>
  ) =>
    value.map((tag: string, index: number) => (
      <Chip
        key={index}
        label={tag}
        {...getTagProps({ index })}
        style={
          isDarkMode
            ? {
                backgroundColor: "#3F3F3F",
                color: "white",
                margin: "4px",
                borderRadius: "4px",
              }
            : {
                backgroundColor: "#EFEFEF",
                color: "#000000",
                margin: "4px",
                borderRadius: "4px",
              }
        }
      />
    ));

  return (
    <Modal
      isOpen={isReviewEditorOpen}
      onRequestClose={closeReviewEditorModal}
      style={customReviewEditorModalStyles}
    >
      <span
        role="button"
        tabIndex={0}
        aria-label="close review editor modal"
        onClick={closeReviewEditorModal}
        onKeyDown={closeReviewEditorModal}
        className="absolute right-2 top-2 cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <CloseIcon size={24} />
      </span>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
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
                    <option className="text-[#636060]" value="">
                      {t("ReviewEditor.category")}
                    </option>
                    {categoriesData?.categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
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
              {/* //TODO: get tags dynamically and max 3 tag*/}
              <Autocomplete
                style={
                  isDarkMode
                    ? {
                        border: "1px solid #DEDEDE",
                        borderRadius: "6px",
                        boxShadow: "none",
                      }
                    : {}
                }
                className="w-[548px] outline-none focus:outline-none dark:border-red-300 dark:text-red-300"
                multiple
                freeSolo
                options={tags}
                autoSelect
                value={selectedTags}
                renderInput={(params) => (
                  <TextField
                    // className="text-[#636060] outline-none focus:outline-none dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                    {...params}
                    fullWidth
                    InputLabelProps={{ children: null }}
                    InputProps={{
                      ...params.InputProps,
                      style: isDarkMode
                        ? {
                            color: "#C2C1BE",
                          }
                        : {},
                    }}
                    placeholder={`${t("ReviewEditor.tags")}`}
                  />
                )}
                renderTags={renderTags}
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
              <DndUploadMiltiple
                width={"548px"}
                urls={urls}
                setUrls={setUrls}
              />
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
              onClick={selectedReviewId ? handleEditReview : handleShareReview}
              className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white"
            >
              <span className="pr-2">
                {selectedReviewId
                  ? t("ReviewEditor.editReview")
                  : t("ReviewEditor.shareReview")}
              </span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReviewEditorModal;
