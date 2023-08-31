import { uploadProfileImage } from "@app/api/users";
import { classNames, convertBase64, errorHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";
import { DndUploadProps } from "@app/types/types";

const DndUploadSingle = (props: DndUploadProps) => {
  const { width, height, url, setUrl } = props;
  const { t } = useTranslation();

  const {
    mutate: uploadProfileImageMutate,
    isLoading: isUploadProfileImageLoading,
  } = useMutation(uploadProfileImage, {
    onSuccess: (response) => {
      setUrl(response);
    },
    onError: errorHandler,
  });

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    uploadProfileImageMutate({ image: base64 });
  };

  return (
    <div className="flex w-full items-center justify-center">
      {url ? (
        <img
          src={url}
          alt="profileImage"
          className="h-[292px] rounded-[10px]"
        />
      ) : (
        <label
          htmlFor="dropzone-file"
          className={classNames(
            "flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[transparent] dark:border-[#DEDEDE]",
            width ? `w-[${width}]` : "w-full",
            url ? "border border-none" : null
          )}
        >
          {isUploadProfileImageLoading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    {t("Profile.clickToUpload")}
                  </span>{" "}
                  {t("Profile.orDnD")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                onChange={uploadImage}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </>
          )}
        </label>
      )}
    </div>
  );
};

export default DndUploadSingle;
