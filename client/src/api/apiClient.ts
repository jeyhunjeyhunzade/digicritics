export const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

// export const serverUrl = "http://localhost:8000";
export const serverUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000"
    : "https://simplefs-server.vercel.app";
