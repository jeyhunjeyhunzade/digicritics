import { useLocation } from "react-router-dom";

function useCurrentPath() {
  const location = useLocation();
  return location.pathname;
}

export default useCurrentPath;
