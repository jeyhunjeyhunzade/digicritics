export const dateFormatter = (
  date: Date | string,
  withHours = false
): string => {
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
