import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getReviews, getTags } from "@app/api/reviews";
import CardSpinner from "@app/components/CardSpinner";
import Loader from "@app/components/Loader";
import ReviewCard from "@app/components/ReviewCard";
import useError from "@app/hooks/useError";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { AppContextShape, ReviewsData, TagsData } from "@app/types/types";
import { calculateAverageRate } from "@app/utils";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "../App";
import Tags from "./TagCloud";

const Homepage = () => {
  const { t } = useTranslation();
  const { onError } = useError();
  const [popularReviews, setPopularReviews] = useState<ReviewsData[]>();
  const [recentReviews, setRecentReviews] = useState<ReviewsData[]>();
  const { setTags } = useContext(AppContext) as AppContextShape;

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    ReviewsData[]
  >(["reviews"], getReviews, {
    onError,
    retry: false,
  });

  const { data: tagsData, isLoading: isTagsLoading } = useQuery<TagsData>(
    ["tags"],
    getTags,
    {
      onError,
      retry: false,
    }
  );

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

  useEffect(() => {
    if (tagsData) {
      const tagNames = tagsData.tags.map((tag) => tag.name);
      setTags(tagNames);
    }
  }, [tagsData]);

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
      <div className="flex h-full min-h-[91vh] w-full flex-col px-20 py-16 dark:bg-[#1B1B1B] max-[600px]:p-6">
        <div className="flex items-start text-2xl dark:text-white">
          {t("Homepage.popularReviews")}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {isReviewsLoading
            ? Array.from({ length: 4 }).map((item, index) => (
                <CardSpinner key={index} />
              ))
            : popularReviews?.map((review: ReviewsData) => (
                <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
                  <ReviewCard review={review} />
                </Link>
              ))}
        </div>

        <div className="mt-10 flex items-start text-2xl dark:text-white">
          {!!recentReviews?.length && t("Homepage.recentlyAdded")}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {isReviewsLoading
            ? Array.from({ length: 4 }).map((item, index) => (
                <CardSpinner key={index} />
              ))
            : recentReviews?.map((review: ReviewsData) => (
                <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
                  <ReviewCard review={review} />
                </Link>
              ))}
        </div>
        <div className="mt-10 flex items-start text-2xl dark:text-white">
          {t("Homepage.popularTags")}
        </div>
        {isTagsLoading ? (
          <Loader />
        ) : (
          <div className="mt-6">
            <Tags />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
