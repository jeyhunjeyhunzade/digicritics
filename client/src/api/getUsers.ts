import axios from "axios";
import { getConfig, serverUrl } from "./apiClient";

export const getUsers = async () => {
  const res = await axios.get(`${serverUrl}/users`, getConfig());
  return res?.data;
};
