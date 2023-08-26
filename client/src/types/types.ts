import { Dispatch, SetStateAction } from "react";

export interface AppContextShape {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  isReviewEditorOpen: boolean;
  setIsReviewEditorOpen: Dispatch<SetStateAction<boolean>>;
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
