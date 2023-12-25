export const shortenString = (string: string | undefined, cutFrom: number) => {
  if (string) {
    if (string.length > cutFrom) {
      return string.substring(0, cutFrom) + "...";
    }
    return string;
  }
};
