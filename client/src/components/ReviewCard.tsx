import HeartIcon from "@app/assets/icons/HeartIcon";
import { ReviewsData } from "@app/types/types";
import { useTranslation } from "react-i18next";
import { checkAuth, dateFormatter, shortenString } from "@app/utils";
import { Rating } from "@mui/material";
import { useState } from "react";

interface ReviewCardProps {
  //TODO: make it required
  review?: ReviewsData;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { t } = useTranslation();
  const isAuthenticated = checkAuth();
  const { review } = props;
  const [ratingValue, setRatingValue] = useState<any>();

  return (
    <div className="delay-30 w-[320px] transform cursor-pointer overflow-hidden rounded-[8px] shadow-cardShadow transition ease-in hover:scale-105 dark:bg-[#2C2C2C]">
      <div className="relative">
        <img
          className="h-[194px] w-full"
          src={review?.reviewImages[0]}
          alt="review image"
        />
        <div className="absolute right-[18px] top-[12px]">
          <div className="flex items-center rounded bg-black bg-opacity-50 p-2">
            <span className="mr-1 text-white">{review?.likes.length}</span>
            <HeartIcon size={16} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="mb-1 flex justify-between">
          <div className="flex text-base font-bold dark:text-white">
            {shortenString(review?.reviewTitle)}
          </div>
          <div className="flex items-center">
            {/* TODO: fix dark mode color  */}
            <Rating
              name="simple-controlled"
              value={ratingValue}
              size="small"
              disabled={!isAuthenticated}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
          </div>
        </div>
        <div className="flex justify-start font-medium dark:text-white">
          {review?.workName}
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">{`${t(
            "Review.category"
          )}:`}</span>
          <span className="ml-1 dark:text-white">{review?.category}</span>
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">
            {`${t("Review.tags")}:`}
          </span>
          {review?.tags.map((tag) => (
            <span
              key={tag.id}
              className="ml-1 dark:text-white"
            >{`#${tag.name}`}</span>
          ))}
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">
            {`${t("Review.authorGrade")}:`}
          </span>
          <span className="ml-1 dark:text-white">{review?.reviewGrade}</span>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-start text-sm">
            <span className="font-medium dark:text-white">{`${t(
              "Review.createdby"
            )}:`}</span>
            <span className="ml-1 dark:text-white">
              {review?.user.fullName}
            </span>
          </div>
          <div className="self-end text-xs text-[#717171] dark:text-[#9C9C9C]">
            {review?.createdTime && dateFormatter(review.createdTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
