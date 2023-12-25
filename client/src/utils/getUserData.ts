export const getLoggedUserId = () => {
  const loggedUserId = localStorage.getItem("loggedUserId");

  if (loggedUserId) {
    return +loggedUserId;
  }
};

export const getUserStatus = () => {
  const status = localStorage.getItem("status");
  return status;
};
