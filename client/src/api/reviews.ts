import {
  ApiConfig,
  CommentReviewParams,
  CreateNewReviewParams,
  EditReviewParams,
  LikeReviewParams,
  RateReviewParams,
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

export const getReviewsByTag = async (tagName: string | null) => {
  const res = await axios.get(`${serverUrl}/reviews/tags/${tagName}`);
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
  const res = await axios.post(`${serverUrl}/getFullTextSearch`, {
    searchQuery,
  });
  return res?.data;
};

export const editReview = async (editReviewParams: EditReviewParams) => {
  const { config } = editReviewParams;
  const res = await axios.patch(
    `${serverUrl}/reviews/updateReview`,
    editReviewParams,
    config
  );
  return res?.data;
};

export const deleteReview = async (deleteReviewParams: {
  reviewId: number;
  config: ApiConfig;
}) => {
  const { reviewId, config } = deleteReviewParams;
  const res = await axios.delete(`${serverUrl}/reviews/${reviewId}/delete`, {
    ...config,
  });
  return res?.data;
};

export const getSimilarReviews = async (reviewId: number) => {
  const res = await axios.get(`${serverUrl}/reviews/similarReview/${reviewId}`);
  return res?.data;
};
