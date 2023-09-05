import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getReviewById, likeReview, rateReview } from "@app/api/reviews";
import HeartIcon from "@app/assets/icons/HeartIcon";
import ImageSlider from "@app/components/ImageSlider";
import Loader from "@app/components/Loader";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { LikeAction } from "@app/types/enums";
import {
  ActionsResponse,
  AppContextShape,
  ReviewsData,
} from "@app/types/types";
import { calculateAverageRate, classNames, dateFormatter } from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { Rating } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "..";
import { AppContext } from "./App";

const ReviewPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const { isAuthenticated } = useAuth0();

  const { loggedUserId } = useContext(AppContext) as AppContextShape;

  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewData, setReviewData] = useState<ReviewsData>();
  const [liked, setLiked] = useState(false);

  const { data: reviewByIdData, isLoading: isReviewByIdLoading } =
    useQuery<any>(["reviewById", id], () => id && getReviewById(id), {
      onError,
      retry: false,
    });

  const { mutate: likeReviewMutate, isLoading: isLikeReviewLoading } =
    useMutation(likeReview, {
      onSuccess: (response: { message: string; action: LikeAction }) => {
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviewById"]);
        queryClient.invalidateQueries(["userById"]);

        if (response.action === LikeAction.LIKED) {
          setLiked(true);
        } else if (response.action === LikeAction.UNLIKED) {
          setLiked(false);
        }
      },
      onError,
    });

  const { mutate: rateReviewMutate, isLoading: isRateReviewLoading } =
    useMutation(rateReview, {
      onSuccess: (response: ActionsResponse) => {
        queryClient.invalidateQueries(["reviews"]);
        queryClient.invalidateQueries(["users"]);
        queryClient.invalidateQueries(["reviewById"]);
        queryClient.invalidateQueries(["userById"]);
      },
      onError,
    });

  useEffect(() => {
    reviewByIdData && setReviewData(reviewByIdData);
  }, [reviewByIdData]);

  useEffect(() => {
    if (reviewData) {
      if (reviewData.likes.length) {
        reviewData.likes.forEach((like) => {
          if (like.userId === loggedUserId) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        });
      } else {
        setLiked(false);
      }

      setRatingValue(calculateAverageRate(reviewData.ratings));
    }
  }, [reviewData]);

  const handleLike = () => {
    if (reviewData && loggedUserId && config) {
      likeReviewMutate({
        userId: loggedUserId,
        reviewId: reviewData.id,
        config,
      });
    }
  };

  const handleRate = (rating: number) => {
    if (loggedUserId && reviewData && config) {
      rateReviewMutate({
        userId: loggedUserId,
        reviewId: reviewData?.id,
        rating,
        config,
      });
    }
  };

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
              <ImageSlider images={reviewData.reviewImages} />
            </div>
            <div className="">
              <div className="relative flex justify-between">
                <div className="flex max-w-[90%] break-all text-left text-[40px] font-semibold dark:text-white">
                  {reviewData.reviewTitle}
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label="like review"
                  onClick={(e) => {
                    if (isAuthenticated) {
                      e.preventDefault();
                      handleLike();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (isAuthenticated) {
                      e.preventDefault();
                      handleLike();
                    }
                  }}
                  className={classNames(
                    "absolute right-0 top-4 flex items-center",
                    isAuthenticated ? "cursor-pointer" : "cursor-default"
                  )}
                >
                  <span className="mr-1 text-2xl text-[#2C2C2C] dark:text-white">
                    {reviewData?.likes.length}
                  </span>
                  <HeartIcon
                    size={24}
                    liked={liked}
                    setLiked={setLiked}
                    color={"#2C2C2C"}
                  />
                </div>
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
                  <span className="font-medium dark:text-white">
                    {`${t("Review.createdby")}:`}
                  </span>
                  <Link to={`${Routes.profile}/${reviewData.userId}`}>
                    <span className="ml-1 dark:text-white">
                      {reviewData.user.fullName}
                    </span>
                  </Link>
                </div>
                <div className="ml-4 self-end text-base text-[#717171] dark:text-[#9C9C9C]">
                  {dateFormatter(reviewData?.createdTime)}
                </div>
              </div>
              <div className="flex h-8">
                <Rating
                  name="simple-controlled"
                  value={ratingValue}
                  size="large"
                  disabled={!isAuthenticated}
                  onChange={(e, newValue) => {
                    newValue && handleRate(newValue);
                  }}
                />
                <span className="ml-4 self-center dark:text-white">
                  {ratingValue ? ratingValue : null}
                </span>
                <div className="ml-6 self-end text-base text-[#717171] dark:text-[#9C9C9C]">
                  {reviewData.ratings.length
                    ? `${reviewData.ratings.length} ${t("Review.ratings")}`
                    : null}
                </div>
              </div>
              <p className="mt-[38px] text-left dark:text-white">
                {reviewData.reviewContent}
              </p>
            </div>
            <div>
              <div className="mt-40 flex items-start text-2xl dark:text-white">
                {t("Review.similiarReviews")}
              </div>
              <div className="mt-6 flex justify-between">
                {/* TODO:  add similiar reviews*/}
              </div>
            </div>
            <div className="mb-20 mt-20 flex items-start text-2xl dark:text-white">
              {t("Review.comments")}
            </div>
            {isAuthenticated && (
              <>
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
              </>
            )}
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
                      alt="userProfilePhoto"
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
                &quotAt vero eos et accusamus et iusto odio dignissimos ducimus
                qui blanditiis praesentium voluptatum deleniti atque corrupti
                quos dolores et quas molestias excepturi sint occaecati
                cupiditate non provident, similique sunt in culpa qui officia
                deserunt mollitia animi, id est laborum et dolorum fuga.
              </div>
            </div>
          </div>
        )
      )}
    </Layout>
  );
};

export default ReviewPage;
