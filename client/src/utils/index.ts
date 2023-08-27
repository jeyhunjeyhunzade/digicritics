import toast from "react-hot-toast";
import { AxiosError } from "axios";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const errorHandler = (error: unknown) => {
  let message = "";

  if (error instanceof AxiosError) {
    message = error.response?.data.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = "unkown error";
  }

  toast.error(message);
};

export const successHandler = (response: { message: string }) => {
  toast.success(response.message);
};

export const checkAuth = (): boolean => {
  const isExpired = checkJwtExpiration();
  const accessToken = localStorage.getItem("token");
  if (!accessToken || isExpired) {
    return false;
  }

  return true;
};

export const dateFormatter = (
  date: Date | string,
  withHours = false
): Date | string | any => {
  const dateTime = new Date(date);

  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  options = withHours
    ? { ...options, hour: "numeric", minute: "numeric", hour12: false }
    : options;

  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    dateTime
  );

  return formattedDateTime;
};

export const classNames = (...classes: Array<string | null>) => {
  return classes.filter(Boolean).join(" ");
};

export const shorteningFullName = (fullName: string) => {
  const nameParts = fullName?.split(" ");

  if (nameParts.length >= 2) {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const initial = lastName.charAt(0).toUpperCase();
    return `${firstName}.${initial}`;
  } else {
    const firstName = fullName.substring(0, 10);
    return `${firstName}.`;
  }
};

export const checkJwtExpiration = (): boolean => {
  let decodedToken: { exp: number; iat: number; userId: number };
  const token = localStorage.getItem("token");
  let isExpired = false;

  if (token) {
    decodedToken = jwt_decode(token);
    isExpired = decodedToken.exp * 1000 < Date.now();
  }

  return isExpired;
};

export const getLoggedUserId = () => {
  let userId: number;
  const token = localStorage.getItem("token");
  let decodedToken: { exp: number; iat: number; userId: number };

  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
    return userId;
  }
};
