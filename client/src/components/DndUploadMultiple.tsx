import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { uploadReviewImages } from "@app/api/users";
import { DnDUploadMultipleProps } from "@app/types/types";
import { classNames, convertBase64, errorHandler } from "@app/utils";
import { useMutation } from "@tanstack/react-query";
import Loader from "./Loader";

const DndUploadMiltiple = (props: DnDUploadMultipleProps) => {
  const { width, height, urls, setUrls } = props;
  const { t } = useTranslation();

  const {
    mutate: uploadReviewImagesMutate,
    isLoading: isUploadReviewImagesLoading,
  } = useMutation(uploadReviewImages, {
    onSuccess: (response) => {
      setUrls(response);
    },
    onError: errorHandler,
  });

  const uploadImages = async (e: any) => {
    const files = e.target.files;

    if (files.length > 3) {
      return toast.error(t("Toast.filesCountLimit"));
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
    console.log("base64s: ", base64s);

    uploadReviewImagesMutate({ images: base64s });
  };

  return (
    <div className="flex w-full items-center justify-center">
      {urls.length ? (
        <div className="flex h-64 w-[548px] items-center justify-center space-x-[25px] rounded-lg border-2 border-dashed border-gray-300 bg-[transparent] dark:border-[#DEDEDE]">
          {urls.map((url: string, i) => (
            <img
              key={i}
              src={url}
              alt="reviewImages"
              className="h-[223px] w-[150px] rounded-[8px] shadow-reviewImagesShadow"
            />
          ))}
        </div>
      ) : (
        <label
          htmlFor="dropzone-file"
          className={classNames(
            "flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[transparent] dark:border-[#DEDEDE]",
            width ? `w-[${width}]` : "w-full",
            urls.length ? "border border-none" : null
          )}
        >
          {isUploadReviewImagesLoading ? (
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
                onChange={uploadImages}
                id="dropzone-file"
                type="file"
                className="hidden"
                multiple
              />
            </>
          )}
        </label>
      )}
    </div>
  );
};

export default DndUploadMiltiple;
