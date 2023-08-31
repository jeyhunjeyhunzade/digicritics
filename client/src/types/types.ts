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
  setLoggedUserId: Dispatch<SetStateAction<number | null>>;
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
  id: number | string | undefined;
  fullName: string;
  profileImage: string | undefined;
}

export interface UsersData {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
  status: UserStatus;
  createdTime: string;
  Like: any;
  Rating: any;
}

export interface DndUploadProps {
  width?: string;
  height?: string;
  url: string | undefined;
  setUrl: Dispatch<SetStateAction<string | undefined>>;
}

export interface DnDUploadMultipleProps {
  width?: string;
  height?: string;
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
}

export interface CreateNewReviewData {
  reviewTitle: string;
  workName: string;
  category: string | undefined;
  reviewGrade: number;
  tags: string[];
  reviewContent: string;
  reviewImages: string[];
  userId: number;
}
