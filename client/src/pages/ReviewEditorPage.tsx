import DndUpload from "@app/components/DndUpload";
import Layout from "@app/components/Layout";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReviewEditor = () => {
  const { t } = useTranslation();
  const [reviewContent, setReviewContent] = useState<any>("");

  return (
    <Layout>
      <div className="flex w-full flex-col p-20 dark:bg-[#1B1B1B]">
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
        <div className="flex flex-col justify-between">
          <div className="mb-6">
            <MDEditor
              value={reviewContent}
              onChange={setReviewContent}
              height={"258px"}
            />
            <MDEditor.Markdown
              source={reviewContent}
              style={{
                whiteSpace: "pre-wrap",
                width: "548px",
              }}
            />
          </div>
          <div>
            <DndUpload width={"548px"} />
          </div>
        </div>
        <div className="mt-10 flex justify-end">
          <button className="ml-4 flex h-[40px] w-[160px] items-center justify-center rounded-[6px] bg-[#209239] text-white">
            <span className="pr-2">{t("ReviewEditor.shareReview")}</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewEditor;
