import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { useContext } from "react";

const SearchIcon = ({ size, color }: { size: number; color?: string }) => {
  const { isDarkMode } = useContext(AppContext) as AppContextShape;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0322 18.3912 14.0616C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94942 18.7933 8.90911 18.3913 7.93848C17.9892 6.96785 17.3999 6.08591 16.657 5.34302C15.9141 4.60014 15.0322 4.01084 14.0616 3.6088C13.0909 3.20675 12.0506 2.99982 11 2.99982C9.94942 2.99982 8.90911 3.20675 7.93848 3.6088C6.96785 4.01084 6.08591 4.60014 5.34302 5.34302C3.84269 6.84335 2.99982 8.87824 2.99982 11C2.99982 13.1218 3.84269 15.1567 5.34302 16.657C6.84335 18.1574 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1574 16.657 16.657Z"
        stroke={isDarkMode ? "white" : color ? color : "#2C2C2C"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchIcon;
