export const serverUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://digicritics-server-76f60f3f49d2.herokuapp.com";
