import {
  ApiConfig,
  CreateNewReviewParams,
  LikeReviewParams,
  RateReviewParams,
  UpdatedUserData,
} from "@app/types/types";
import axios from "axios";
import { serverUrl } from "./apiClient";

export const createNewReview = async (
  createNewReviewData: CreateNewReviewParams
) => {
  const { config } = createNewReviewData;
  const res = await axios.post(
    `${serverUrl}/review/createReview`,
    createNewReviewData,
    config
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

export const likeReview = async (likeReviewParams: LikeReviewParams) => {
  const { reviewId, userId, config } = likeReviewParams;
  const res = await axios.patch(
    `${serverUrl}/reviews/${reviewId}/like`,
    { userId },
    config
  );
  return res?.data;
};

export const rateReview = async (rateReviewParams: RateReviewParams) => {
  const { reviewId, userId, rating, config } = rateReviewParams;
  const res = await axios.patch(
    `${serverUrl}/reviews/${reviewId}/rate`,
    { userId, rating },
    config
  );
  return res?.data;
};
