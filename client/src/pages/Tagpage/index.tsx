import { Link, useParams } from "react-router-dom";
import { getReviewsByTag } from "@app/api/reviews";
import CardSpinner from "@app/components/CardSpinner";
import ReviewCard from "@app/components/ReviewCard";
import Layout from "@app/layout/AppLayout";
import { Routes } from "@app/router/rooter";
import { ReviewsData } from "@app/types/types";
import { errorHandler } from "@app/utils";
import { useQuery } from "@tanstack/react-query";

const Tagpage = () => {
  const { tagName } = useParams();

  const { data: reviewByTag, isLoading: isReviewByTagLoading } = useQuery<
    ReviewsData[] | null
  >(
    ["reviewByTag", tagName],
    () => {
      if (tagName) {
        return getReviewsByTag(tagName);
      } else {
        return null;
      }
    },
    {
      onError: (error) => {
        errorHandler(error);
      },
      retry: false,
    }
  );

  return (
    <Layout>
      <div className="flex min-h-[91vh] w-full flex-col px-20 py-16 dark:bg-[#1B1B1B]">
        <div className="text-4xl font-semibold text-[#013549] dark:text-white">
          #{tagName}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {isReviewByTagLoading
            ? Array.from({ length: 4 }).map((item, index) => (
                <CardSpinner key={index} />
              ))
            : reviewByTag?.map((review: ReviewsData) => (
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
