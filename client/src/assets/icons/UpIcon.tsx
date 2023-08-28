import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { useContext } from "react";

const UpIcon = ({ size, color }: { size: number; color?: string }) => {
  const { isDarkMode } = useContext(AppContext) as AppContextShape;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="up">
        <path
          id="Vector 458"
          d="M3.48207 12L10.5179 12C12.0615 12 13.0233 10.3256 12.2455 8.99226L8.72756 2.96153C7.9558 1.63852 6.0442 1.63852 5.27244 2.96153L1.75452 8.99226C0.97675 10.3256 1.93849 12 3.48207 12Z"
          fill={isDarkMode ? "white" : color ? color : "#2C2C2C"}
        />
      </g>
    </svg>
  );
};

export default UpIcon;
