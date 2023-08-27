import { Dispatch, SetStateAction } from "react";
import { UserStatus } from "./enums";

export interface AppContextShape {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  isReviewEditorOpen: boolean;
  setIsReviewEditorOpen: Dispatch<SetStateAction<boolean>>;
  loggedUserId: number | null;
  loggedUser: LoggedUser | null;
  setLoggedUser: Dispatch<SetStateAction<LoggedUser | null>>;
}

export interface ActionsResponse {
  message: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface LoggedUser {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
  status: UserStatus;
  createdTime: string;
}

export interface UpdatedUserData {
  id: number;
  fullName: string;
  profileImage: string;
}
