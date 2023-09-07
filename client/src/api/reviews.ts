import {
  ApiConfig,
  CommentReviewParams,
  CreateNewReviewParams,
  LikeReviewParams,
  RateReviewParams,
  UpdatedUserData,
} from "@app/types/types";
import axios from "axios";
import { serverUrl } from "./apiClient";

export const createNewReview = async (
  createNewReviewParams: CreateNewReviewParams
) => {
  const { config } = createNewReviewParams;
  const res = await axios.post(
    `${serverUrl}/review/createReview`,
    createNewReviewParams,
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

export const getTags = async () => {
  const res = await axios.get(`${serverUrl}/tags`);
  return res?.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${serverUrl}/categories`);
  return res?.data;
};

export const createNewCategory = async ({
  categoryName,
  config,
}: {
  categoryName: string;
  config: ApiConfig;
}) => {
  const res = await axios.post(
    `${serverUrl}/createCategory`,
    { categoryName },
    config
  );
  return res?.data;
};

export const deleteCategory = async (deleteAccountsParams: {
  categoryName: string;
  config: ApiConfig;
}) => {
  const { categoryName, config } = deleteAccountsParams;
  const res = await axios.delete(`${serverUrl}/deleteCategory`, {
    data: { categoryName },
    ...config,
  });
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

export const getCommentsForReview = async (reviewId: string | number) => {
  const res = await axios.get(`${serverUrl}/reviews/${reviewId}/comments`);
  return res?.data;
};

export const commentReview = async (
  commentReviewParams: CommentReviewParams
) => {
  const { reviewId, userId, content, config } = commentReviewParams;
  const res = await axios.patch(
    `${serverUrl}/reviews/${reviewId}/addComment`,
    { userId, content },
    config
  );
  return res?.data;
};

export const getFullTextSearch = async (searchQuery: string) => {
  const res = await axios.post(`${serverUrl}/getFullTextSearch`, searchQuery);
  return res?.data;
};
