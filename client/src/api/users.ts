import {
  ApiConfig,
  GetUserByIdParams,
  SignUpParams,
  UpdatedUserData,
} from "@app/types/types";
import axios from "axios";
import { serverUrl } from "./apiClient";

export const getUsers = async (config: ApiConfig) => {
  const res = await axios.get(`${serverUrl}/users`, config);
  return res?.data;
};

export const getUserById = async (getUserByIdParams: GetUserByIdParams) => {
  const { id, config } = getUserByIdParams;
  const res = await axios.get(`${serverUrl}/users/${id}`, config);
  return res?.data;
};

export const getUserByEmail = async (getUserByEmailParams: SignUpParams) => {
  const { config } = getUserByEmailParams;
  const res = await axios.post(
    `${serverUrl}/users/email`,
    getUserByEmailParams,
    config
  );
  return res?.data;
};

export const updateUser = async (updatedUserData: UpdatedUserData) => {
  const { config } = updatedUserData;
  const res = await axios.patch(
    `${serverUrl}/users/edit`,
    updatedUserData,
    config
  );
  return res?.data;
};

export const uploadProfileImage = async ({
  image,
}: {
  image: Blob | unknown;
}) => {
  const res = await axios.post(`${serverUrl}/uploadMedia`, image);
  return res?.data;
};

export const uploadReviewImages = async ({
  images,
}: {
  images: Blob[] | unknown;
}) => {
  const res = await axios.post(`${serverUrl}/uploadMultipleMedia`, images);
  return res?.data;
};
