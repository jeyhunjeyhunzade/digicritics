import { UserStatus } from "@app/types/enums";
import { ApiConfig, LoginParams, SignUpParams } from "@app/types/types";
import axios from "axios";
import { serverUrl } from "./apiClient";

export const loginAccount = async (loginParams: LoginParams) => {
  const res = await axios.post(`${serverUrl}/login`, loginParams);
  return res?.data;
};

export const createAccount = async (singUpParams: SignUpParams) => {
  const res = await axios.post(`${serverUrl}/signUp`, singUpParams);
  return res?.data;
};

export const blockAccounts = async (blockAccountsParams: {
  userIds: string[];
  config: ApiConfig;
}) => {
  const { userIds, config } = blockAccountsParams;
  const res = await axios.patch(
    `${serverUrl}/users/block`,
    { userIds },
    config
  );
  return res?.data;
};

export const unBlockAccounts = async (unBlockAccountsParams: {
  userIds: string[];
  config: ApiConfig;
}) => {
  const { userIds, config } = unBlockAccountsParams;
  const res = await axios.patch(
    `${serverUrl}/users/unblock`,
    { userIds },
    config
  );
  return res?.data;
};

export const deleteAccounts = async (deleteAccountsParams: {
  userIds: number[];
  config: ApiConfig;
}) => {
  const { userIds, config } = deleteAccountsParams;
  const res = await axios.delete(`${serverUrl}/users`, {
    data: { userIds },
    ...config,
  });
  return res?.data;
};

export const updateUserRole = async (updateUserRoleParams: {
  userIds: string[];
  status: UserStatus;
  config: ApiConfig;
}) => {
  const { userIds, status, config } = updateUserRoleParams;

  const res = await axios.patch(
    `${serverUrl}/users/updaterole`,
    { userIds, status },
    config
  );
  return res?.data;
};
