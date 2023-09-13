import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getReviews } from "@app/api/reviews";
import ReviewCard from "@app/components/ReviewCard";
import useError from "@app/hooks/useError";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { ReviewsData } from "@app/types/types";
import { useQuery } from "@tanstack/react-query";
import Tags from "./TagCloud";

const Homepage = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const [reviews, setReviews] = useState<ReviewsData[]>();

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    ReviewsData[]
  >(["reviews"], getReviews, {
    onError,
    retry: false,
  });

  useEffect(() => {
    reviewsData && setReviews(reviewsData);
  }, [reviewsData]);

  return (
    <Layout>
      <div className="flex h-full w-full flex-col px-20 py-16 dark:bg-[#1B1B1B]">
        <div className="flex items-start text-2xl dark:text-white">
          {t("Homepage.popularReviews")}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {reviews?.map((review: ReviewsData) => (
            <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
              <ReviewCard review={review} />
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-start text-2xl dark:text-white">
          {t("Homepage.recentlyAdded")}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {reviews?.map((review: ReviewsData) => (
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
