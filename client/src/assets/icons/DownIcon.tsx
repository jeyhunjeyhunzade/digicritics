import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";
import { useContext } from "react";

const DownIcon = ({ size, color }: { size: number; color?: string }) => {
  const { isDarkMode } = useContext(AppContext) as AppContextShape;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="down">
        <path
          id="Vector 458"
          d="M10.5179 4.59753e-07L3.48207 1.52206e-07C1.93849 8.47342e-08 0.976748 1.67443 1.75451 3.00774L5.27244 9.03847C6.0442 10.3615 7.9558 10.3615 8.72756 9.03847L12.2455 3.00774C13.0232 1.67443 12.0615 5.27225e-07 10.5179 4.59753e-07Z"
          fill={isDarkMode ? "white" : color ? color : "#2C2C2C"}
        />
      </g>
    </svg>
  );
};

export default DownIcon;
