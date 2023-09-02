import axios from "axios";
import { getConfig, serverUrl } from "./apiClient";
import { CreateNewReviewData, UpdatedUserData } from "@app/types/types";

export const createNewReview = async (
  createNewReviewData: CreateNewReviewData
) => {
  const res = await axios.post(
    `${serverUrl}/review/createReview`,
    createNewReviewData,
    getConfig()
  );
  return res?.data;
};

export const getReviews = async () => {
  const res = await axios.get(`${serverUrl}/reviews`);
  return res?.data;
};

export const getReviewById = async (reviewId: number | string | null) => {
  const res = await axios.get(`${serverUrl}/reviews/${reviewId}`);
  return res?.data;
};

export const likeReview = async ({
  userId,
  reviewId,
}: {
  userId: number;
  reviewId: number;
}) => {
  const res = await axios.patch(
    `${serverUrl}/reviews/${reviewId}/like`,
    { userId },
    getConfig()
  );
  return res?.data;
};

export const rateReview = async ({
  userId,
  reviewId,
  rating,
}: {
  userId: number;
  reviewId: number;
  rating: number;
}) => {
  const res = await axios.patch(
    `${serverUrl}/reviews/${reviewId}/rate`,
    { userId, rating },
    getConfig()
  );
  return res?.data;
};
