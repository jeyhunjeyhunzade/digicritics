import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReviewsByTag } from "@app/api/reviews";
import ReviewCard from "@app/components/ReviewCard";
import useError from "@app/hooks/useError";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { ReviewsData } from "@app/types/types";
import { useQuery } from "@tanstack/react-query";

const Tagpage = () => {
  const { tagName } = useParams();
  const { onError } = useError();
  const [reviews, setReviews] = useState<ReviewsData[]>();

  const { data: reviewByIdData, isLoading: isReviewByIdLoading } = useQuery<
    ReviewsData[] | null
  >(
    ["reviewById", tagName],
    () => {
      if (tagName) {
        return getReviewsByTag(tagName);
      } else {
        return null;
      }
    },
    {
      onError,
      retry: false,
    }
  );

  useEffect(() => {
    reviewByIdData && setReviews(reviewByIdData);
  }, [reviewByIdData]);

  return (
    <Layout>
      <div className="flex min-h-[91vh] w-full flex-col px-20 py-16 dark:bg-[#1B1B1B]">
        <div className="text-4xl font-semibold text-[#013549] dark:text-white">
          #{tagName}
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4">
          {reviews?.map((review: ReviewsData) => (
            <Link key={review.id} to={`${Routes.reviewpage}/${review.id}`}>
              <ReviewCard review={review} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Tagpage;
