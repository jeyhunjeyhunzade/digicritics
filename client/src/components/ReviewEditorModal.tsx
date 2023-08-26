import MDEditor from "@uiw/react-md-editor";
import { useContext, useState } from "react";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

import CloseIcon from "@app/assets/icons/CloseIcon";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import DndUpload from "./DndUpload";

const ReviewEditorModal = () => {
  const { t } = useTranslation();
  const { isDarkMode, isReviewEditorOpen, setIsReviewEditorOpen } = useContext(
    AppContext
  ) as AppContextShape;
  const [reviewContent, setReviewContent] = useState<any>("");

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
            placeholder={t("ReviewEditor.reviewTitle")}
            className="mt-12 h-[48px] w-[548px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
          />
          <input
            type="text"
            placeholder={t("ReviewEditor.workName")}
            className="mt-12 h-[48px] w-[548px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
          />
        </div>
        <div className="mb-6 flex justify-between">
          <div className="flex">
            <div className="mr-3 flex">
              <div className="h-[48px] w-[262px]">
                <select
                  id="region"
                  name="region"
                  className="block h-full w-full rounded-md border-gray-300 bg-[transparent] px-3 text-[#2C2C2C] shadow-sm dark:border-[#2C2C2C] dark:border-[#2C2C2C] dark:border-[#DEDEDE] dark:text-[#9D9D9D] dark:placeholder-[#9D9D9D]"
                  // value={region}
                  // onChange={(e) => {
                  //   setRegion(e.target.value);
                  // }}
                >
                  <option value="">{t("ReviewEditor.category")}</option>
                  <option>Games</option>
                  <option>Movies</option>
                  <option>Sport</option>
                  <option>Games</option>
                  <option>Movies</option>
                  <option>Sport</option>
                </select>
              </div>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder={t("ReviewEditor.reviewGrade")}
                className="h-[48px] w-[274px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
              />
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder={t("ReviewEditor.tags")}
              className="h-[48px] w-[548px] rounded-[6px] border border-solid border-[#DEDEDE] bg-[transparent] px-4 py-2 pr-10 placeholder-[#636060] outline-none focus:ring-0 dark:border-[#DEDEDE] dark:text-[#C2C1BE] dark:placeholder-[#9D9D9D]"
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
            <DndUpload width={"548px"} />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button
            onClick={closeReviewEditorModal}
            className="flex h-[44px] w-[160px] items-center justify-center rounded-[6px] border-2 border-solid border-[#DEDEDE] bg-[transparent] text-[#2C2C2C] dark:border-[#DEDEDE] dark:text-white"
          >
            {t("ReviewEditor.cancel")}
          </button>
          <button className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white">
            <span className="pr-2">{t("ReviewEditor.shareReview")}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewEditorModal;
