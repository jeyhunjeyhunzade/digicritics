import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { likeReview } from "@app/api/reviews";
import HeartIcon from "@app/assets/icons/HeartIcon";
import useError from "@app/hooks/useError";
import useGetConfig from "@app/hooks/useGetConfig";
import { AppContext } from "@app/pages/App";
import { LikeAction } from "@app/types/enums";
import { AppContextShape, ReviewsData } from "@app/types/types";
import {
  calculateAverageRate,
  classNames,
  dateFormatter,
  shortenString,
} from "@app/utils";
import { useAuth0 } from "@auth0/auth0-react";
import { Rating } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "..";

interface ReviewCardProps {
  review: ReviewsData;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { t } = useTranslation();
  const { onError } = useError();
  const { config } = useGetConfig();
  const { isAuthenticated } = useAuth0();

  const { review } = props;
  const [ratingValue, setRatingValue] = useState<number>();
  const [liked, setLiked] = useState(false);

  const { loggedUserId } = useContext(AppContext) as AppContextShape;

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

  useEffect(() => {
    if (review.likes.length) {
      review.likes.forEach((like) => {
        if (like.userId === loggedUserId) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    } else {
      setLiked(false);
    }

    if (review.ratings.length) {
      setRatingValue(calculateAverageRate(review.ratings));
    }
  }, [review]);

  const handleLike = () => {
    if (review && loggedUserId && config && !isLikeReviewLoading) {
      likeReviewMutate({
        userId: loggedUserId,
        reviewId: review.id,
        config,
      });
    }
  };

  return (
    <div className="delay-30 w-[320px] transform cursor-pointer overflow-hidden rounded-[8px] shadow-cardShadow transition ease-in hover:scale-105 dark:bg-[#2C2C2C]">
      <div className="relative">
        <div
          style={{ backgroundImage: `url(${review?.reviewImages[0]})` }}
          className={`h-[194px] w-full bg-cover bg-center`}
        ></div>
        <div className="absolute right-[18px] top-[12px]">
          <div
            role="button"
            aria-label="like review"
            tabIndex={0}
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
              "flex items-center rounded bg-black bg-opacity-50 p-2",
              isAuthenticated ? "cursor-pointer" : "cursor-default"
            )}
          >
            <span className="mr-1 text-white">{review?.likes.length}</span>
            <HeartIcon size={16} liked={liked} setLiked={setLiked} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="mb-1 flex justify-between">
          <div className="flex text-base font-bold leading-[18px] dark:text-white">
            {shortenString(review?.reviewTitle, 20)}
          </div>
          <div className="flex items-center">
            {/* TODO: fix dark mode color  */}
            <Rating
              name="simple-controlled"
              value={ratingValue ? ratingValue : 0}
              size="small"
              readOnly
              className="text-gray-500 dark:text-yellow-500"
            />
          </div>
        </div>
        <div className="flex justify-start font-medium leading-[18px] dark:text-white">
          {review?.workName}
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium leading-[18px] dark:text-white">{`${t(
            "Review.category"
          )}:`}</span>
          <span className="ml-1 leading-[18px] dark:text-white">
            {review?.category?.name}
          </span>
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium leading-[18px] dark:text-white">
            {`${t("Review.tags")}:`}
          </span>
          {review?.tags.map((tag) => (
            <span
              key={tag.id}
              className="ml-1 leading-[18px] dark:text-white"
            >{`#${tag.name}`}</span>
          ))}
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium leading-[18px] dark:text-white">
            {`${t("Review.authorGrade")}:`}
          </span>
          <span className="ml-1 leading-[18px] dark:text-white">
            {review?.reviewGrade}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-start text-sm">
            <span className="font-medium dark:text-white">{`${t(
              "Review.createdby"
            )}:`}</span>
            <span className="ml-1 leading-[18px] dark:text-white">
              {review?.user.fullName}
            </span>
          </div>
          <div className="self-end text-xs leading-[18px] text-[#717171] dark:text-[#9C9C9C]">
            {review?.createdTime && dateFormatter(review.createdTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
