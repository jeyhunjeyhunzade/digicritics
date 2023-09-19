import { useContext } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";

interface LeftArrowIconProps {
  size: number;
  color?: string;
}

const LeftArrowIcon = (props: LeftArrowIconProps) => {
  const { size, color } = props;
  const { isDarkMode } = useContext(AppContext) as AppContextShape;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 6 12"
      fill={isDarkMode ? "white" : color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.46851 0.414376C5.79196 0.673133 5.8444 1.1451 5.58564 1.46855L1.96046 6.00003L5.58564 10.5315C5.8444 10.855 5.79196 11.3269 5.46851 11.5857C5.14506 11.8444 4.67309 11.792 4.41434 11.4685L0.414338 6.46855C0.195206 6.19464 0.195206 5.80542 0.414338 5.53151L4.41434 0.531506C4.6731 0.20806 5.14506 0.155619 5.46851 0.414376Z"
        fill={isDarkMode ? "white" : color}
      />
    </svg>
  );
};

export default LeftArrowIcon;
