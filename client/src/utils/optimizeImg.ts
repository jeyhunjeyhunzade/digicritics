export const optimizeImg = (url: string, transformation: string): string => {
  const parts = url.split("/upload/");
  const newUrl = parts[0] + "/upload/" + transformation + "/" + parts[1];
  return newUrl;
};

// "w_500,f_auto"
