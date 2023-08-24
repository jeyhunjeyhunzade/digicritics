import HeartIcon from "@app/assets/icons/HeartIcon";
import ReviewStar from "@app/assets/icons/ReviewStar";
import { useTranslation } from "react-i18next";

const ReviewCard = () => {
  const { t } = useTranslation();

  return (
    <div className="delay-30 w-[320px] transform cursor-pointer overflow-hidden rounded-[8px] shadow-cardShadow transition ease-in hover:scale-105 dark:bg-[#2C2C2C]">
      <div className="relative">
        <img
          className="h-[194px] w-full"
          src="/testimage.jpg"
          alt="Sunset in the mountains"
        />
        <div className="absolute right-[16px] top-[16px] mr-2 mt-2">
          <div className="flex items-center">
            <span className="mr-1 text-white">19</span>
            <HeartIcon size={16} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="mb-1 flex justify-between">
          <div className="flex text-base font-bold dark:text-white">
            Polaroid Land Camer...
          </div>
          <ReviewStar />
        </div>
        <div className="flex justify-start font-medium dark:text-white">
          Movies
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">{`${t(
            "Review.category"
          )}:`}</span>
          <span className="ml-1 dark:text-white">Photo</span>
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">
            {`${t("Review.tags")}:`}
          </span>
          <span className="ml-1 dark:text-white">#photo #art #fashion</span>
        </div>
        <div className="flex justify-start text-sm">
          <span className="font-medium dark:text-white">
            {`${t("Review.authorGrade")}:`}
          </span>
          <span className="ml-1 dark:text-white">6</span>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-start text-sm">
            <span className="font-medium dark:text-white">{`${t(
              "Review.createdby"
            )}:`}</span>
            <span className="ml-1 dark:text-white">Henry Adams</span>
          </div>
          <div className="self-end text-xs text-[#717171] dark:text-[#9C9C9C]">
            22/08/2023
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
