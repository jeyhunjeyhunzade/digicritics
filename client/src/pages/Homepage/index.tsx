import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getReviews } from "@app/api/reviews";
import ReviewCard from "@app/components/ReviewCard";
import useError from "@app/hooks/useError";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { ReviewsData } from "@app/types/types";
import { calculateAverageRate } from "@app/utils";
import { useQuery } from "@tanstack/react-query";
import Tags from "./TagCloud";

const Homepage = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const [popularReviews, setPopularReviews] = useState<ReviewsData[]>();
  const [recentReviews, setRecentReviews] = useState<ReviewsData[]>();

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    ReviewsData[]
  >(["reviews"], getReviews, {
    onError,
    retry: false,
  });

  useEffect(() => {
    const popularReviews = reviewsData?.filter(
      (review) => calculateAverageRate(review.ratings) >= 4
    );
    setPopularReviews(popularReviews);

    const recentReviews = reviewsData?.filter((review) =>
      isRecentReview(review.createdTime)
    );

    setRecentReviews(recentReviews);
  }, [reviewsData]);

  const isRecentReview = (dateToCheck: Date | string) => {
    const currentDate: Date = new Date();
    const threeDaysAgo: Date = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);

    if (dateToCheck >= threeDaysAgo.toISOString()) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col px-20 py-16 dark:bg-[#1B1B1B]">
        <div className="flex items-start text-2xl dark:text-white">
          {t("Homepage.popularReviews")}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {popularReviews?.map((review: ReviewsData) => (
            <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
              <ReviewCard review={review} />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-start text-2xl dark:text-white">
          {t("Homepage.recentlyAdded")}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {recentReviews?.map((review: ReviewsData) => (
            <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
              <ReviewCard review={review} />
            </Link>
          ))}
        </div>
        <div className="mt-10 flex items-start text-2xl dark:text-white">
          {t("Homepage.popularTags")}
        </div>
        <div className="mt-6">
          <Tags />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
