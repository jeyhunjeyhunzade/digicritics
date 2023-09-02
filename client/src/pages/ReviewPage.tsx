import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Rating } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getReviewById } from "@app/api/reviews";
import Layout from "@app/components/Layout";
import Loader from "@app/components/Loader";
import ReviewCard from "@app/components/ReviewCard";
import useError from "@app/hooks/useError";
import { Routes } from "@app/router/rooter";
import { GalleryImage, ReviewsData } from "@app/types/types";
import { checkAuth, dateFormatter, errorHandler } from "@app/utils";

import "react-image-gallery/styles/css/image-gallery.css";

const ReviewPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { onError } = useError();
  const isAuthenticated = checkAuth();

  const [ratingValue, setRatingValue] = useState<any>();
  const [reviewData, setReviewData] = useState<ReviewsData>();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const { data: reviewByIdData, isLoading: isReviewByIdLoading } =
    useQuery<any>(["reviewById", id], () => id && getReviewById(id), {
      onError,
      retry: false,
    });

  useEffect(() => {
    reviewByIdData && setReviewData(reviewByIdData);
  }, [reviewByIdData]);

  useEffect(() => {
    if (reviewData) {
      const galleryImages: GalleryImage[] = reviewData.reviewImages.map(
        (image: string) => {
          return {
            original: image,
          };
        }
      );
      setGalleryImages(galleryImages);
    }
  }, [reviewData]);

  return (
    <Layout>
      {isReviewByIdLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        reviewData && (
          <div className="p-20 dark:bg-[#1B1B1B]">
            <div>
              {galleryImages.length && (
                <ImageGallery
                  items={galleryImages}
                  additionalClass="float-left mb-12 mr-8 h-full w-[620px] rounded-[20px] shadow-cardShadow bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5"
                />
              )}
            </div>
            <div className="">
              <div className="flex justify-start text-left text-[40px] font-semibold dark:text-white">
                {reviewData.reviewTitle}
              </div>
              <div className="mb-4 flex justify-start text-[32px] font-medium dark:text-white">
                {reviewData.workName}
              </div>
              <div className="mb-3 flex justify-start text-2xl">
                <span className="font-medium	 dark:text-white">
                  {`${t("Review.category")}:`}
                </span>
                <span className="ml-1 dark:text-white">
                  {reviewData.category}
                </span>
              </div>
              <div className="mb-3 flex justify-start text-2xl">
                <span className="font-medium	 dark:text-white">
                  {`${t("Review.tags")}:`}
                </span>
                <span className="ml-1 dark:text-white">
                  {reviewData?.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="ml-1 dark:text-white"
                    >{`#${tag.name}`}</span>
                  ))}
                </span>
              </div>
              <div className="mb-2 flex">
                <div className="flex justify-start text-2xl">
                  <span className="font-medium	 dark:text-white">
                    {`${t("Review.createdby")}:`}
                  </span>
                  <span className="ml-1 dark:text-white">
                    {reviewData.user.fullName}
                  </span>
                </div>
                <div className="ml-4 self-end text-base text-[#717171] dark:text-[#9C9C9C]">
                  {reviewData?.createdTime &&
                    dateFormatter(reviewData.createdTime)}
                </div>
              </div>
              <div className="flex h-8">
                <Rating
                  name="simple-controlled"
                  // TODO: calculate rates and give calculated rate
                  value={ratingValue}
                  size="large"
                  disabled={!isAuthenticated}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
                <span className="ml-4 self-center dark:text-white">
                  {/* TODO: calculate rates */}
                  {reviewData.ratings.length}
                </span>
              </div>
              <p className="mt-[38px] text-left dark:text-white">
                {reviewData.reviewContent}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="mt-20 flex items-start text-2xl dark:text-white">
                {t("Review.similiarReviews")}
              </div>
              <div className="mt-6 flex justify-between">
                {Array.from({ length: 1 }).map((item: any, i) => (
                  <div key={i}>
                    <Link to={`${Routes.reviewpage}/2`}>
                      <ReviewCard />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20">
              <textarea
                placeholder={t("Review.yourComment")}
                className="h-[115px] w-full rounded-[6px] border border-solid border-[#044D69] bg-[transparent] placeholder:text-black dark:border-[#DEDEDE] dark:text-white dark:placeholder:text-white"
              ></textarea>
            </div>
            <div className="my-4 flex justify-end">
              <button
                type="button"
                className="flex h-[48px] w-[182px] items-center justify-center rounded-md bg-gradientBtnBlue px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Review.postComment")}
              </button>
            </div>
            <div className="mb-10 flex flex-col">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div
                    role="button"
                    tabIndex={0}
                    className="cursor-pointer"
                    aria-label="Go to user page"
                  >
                    <img
                      src="/testprofile.jpeg"
                      className="h-[44px] w-[44px] rounded-[32px]"
                    />
                  </div>
                  <div className="ml-2 flex flex-col items-start dark:text-white">
                    <span className="text-lg font-medium">
                      Jeyhun Jeyhunzade
                    </span>
                    <span className="text-sm text-[#989292]">24/08/2023</span>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-left dark:text-white">
                "At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.
              </div>
            </div>
          </div>
        )
      )}
    </Layout>
  );
};

export default ReviewPage;
