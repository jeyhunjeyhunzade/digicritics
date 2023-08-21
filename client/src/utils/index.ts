import toast from "react-hot-toast";
import { AxiosError } from "axios";

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
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    return false;
  }

  return true;
};

export const dateFormatter = (
  date: Date | string,
  withHours = false
): Date | string => {
  if (!date) {
    return "not logged in yet";
  }

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
