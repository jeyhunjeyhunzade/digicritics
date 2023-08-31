import axios from "axios";
import { getConfig, serverUrl } from "./apiClient";
import { UpdatedUserData } from "@app/types/types";

export const getUsers = async () => {
  const res = await axios.get(`${serverUrl}/users`, getConfig());
  return res?.data;
};

export const getUserById = async (id: number | string | null) => {
  const res = await axios.get(`${serverUrl}/users/${id}`, getConfig());
  return res?.data;
};

export const updateUser = async (updatedUserData: UpdatedUserData) => {
  const res = await axios.patch(
    `${serverUrl}/users/edit`,
    updatedUserData,
    getConfig()
  );
  return res?.data;
};

export const uploadProfileImage = async (image: any) => {
  const res = await axios.post(`${serverUrl}/uploadMedia`, image);
  return res?.data;
};

export const uploadReviewImages = async (images: any) => {
  const res = await axios.post(`${serverUrl}/uploadMultipleMedia`, images);
  return res?.data;
};
