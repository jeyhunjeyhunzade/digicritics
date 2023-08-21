import { LoginData, SignUpData } from "@app/types/types";
import axios from "axios";
import { getConfig, serverUrl } from "./apiClient";

export const loginAccount = async (loginData: LoginData) => {
  const res = await axios.post(`${serverUrl}/login`, loginData);
  return res?.data;
};

export const createAccount = async (signUpData: SignUpData) => {
  const res = await axios.post(`${serverUrl}/signUp`, signUpData);
  return res?.data;
};

export const blockAccounts = async (userIds: string[]) => {
  const res = await axios.patch(
    `${serverUrl}/users/block`,
    { userIds },
    getConfig()
  );
  return res?.data;
};

export const unBlockAccounts = async (userIds: string[]) => {
  const res = await axios.patch(
    `${serverUrl}/users/unblock`,
    { userIds },
    getConfig()
  );
  return res?.data;
};

export const deleteAccounts = async (userIds: string[]) => {
  const res = await axios.delete(`${serverUrl}/users`, {
    data: { userIds },
    ...getConfig(),
  });
  return res?.data;
};
