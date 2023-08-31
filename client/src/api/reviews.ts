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
