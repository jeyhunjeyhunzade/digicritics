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
  config: ApiConfig | undefined;
  setConfig: Dispatch<SetStateAction<ApiConfig | undefined>>;
  isCategoryEditorOpen: boolean;
  setCategoryEditorOpen: Dispatch<SetStateAction<boolean>>;
  selectedReviewId: number | null;
  setSelectedReviewId: Dispatch<SetStateAction<number | null>>;
  isDeleteReviewModalOpen: boolean;
  setIsDeleteReviewModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ApiConfig {
  headers: {
    Authorization: string;
  };
}

export interface ActionsResponse {
  message: string;
}

export interface LoggedUser {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
  status: UserStatus;
  createdTime: string;
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

export interface CloudTags {
  value: string;
  count: number;
}

export interface Like {
  id: number;
  reviewId: number;
  userId: number;
}

export interface Rate {
  id: number;
  reviewId: number;
  userId: number;
  rating: number;
}

export interface Review {
  id: number;
  reviewTitle: string;
  workName: string;
  category: string;
  reviewGrade: number;
  createdTime: string;
  likes: number;
  ratings: number;
}

export interface ReviewTags {
  id: number;
  name: string;
}

export interface GalleryImage {
  original: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  userId: number;
  reviewId: number;
  content: string;
  createdTime: string;
  user: Omit<UsersData, "Like" | "Rating" | "reviews">;
}

export interface Category {
  id: number;
  name: string;
}

//Response
export interface UpdatedUserData {
  id: number | string | undefined;
  fullName: string;
  profileImage: string | undefined;
  config?: ApiConfig;
}

export interface UsersData {
  id: number;
  fullName: string;
  email: string;
  profileImage: string;
  status: UserStatus;
  createdTime: string;
  Like: Like[];
  Rating: Rate[];
  reviews: Omit<ReviewsData, "user">[];
}

export interface ReviewsData {
  id: number;
  reviewTitle: string;
  workName: string;
  reviewGrade: number;
  reviewContent: string;
  reviewImages: string[];
  userId: number;
  createdTime: string;
  tags: ReviewTags[];
  likes: Like[];
  ratings: Rate[];
  category: Category;
  comments: [];
  user: Omit<UsersData, "Like" | "Rating">;
}

export interface TagsData {
  tags: Tag[];
}

export interface CategoriesData {
  categories: Category[];
}

export interface CommentsData {
  comments: Comment[];
}

export interface CommentsSocketData {
  newComment: Comment;
}

//Params
export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  name?: string;
  profileImage?: string;
  config?: ApiConfig;
}

export interface LikeReviewParams {
  userId: number;
  reviewId: number;
  config: ApiConfig;
}

export interface RateReviewParams {
  userId: number;
  reviewId: number;
  rating: number;
  config: ApiConfig;
}

export interface CommentReviewParams {
  userId: string | number;
  reviewId: string | number;
  content: string;
  config: ApiConfig;
}

export interface EditReviewParams {
  reviewId: number;
  reviewTitle: string;
  workName: string;
  category: string;
  reviewGrade: number;
  tags: string[];
  reviewContent: string;
  reviewImages: string[];
  config: ApiConfig;
}

export interface CreateNewReviewParams {
  reviewTitle: string;
  workName: string;
  category: string | undefined;
  reviewGrade: number;
  tags: string[];
  reviewContent: string;
  reviewImages: string[];
  userId: number;
  config: ApiConfig;
}

export interface GetUserByIdParams {
  id: number;
  config: ApiConfig;
}
