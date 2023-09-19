import { useContext } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";

interface DoubleRightIconProps {
  size: number;
  color?: string;
}

const DoubleRightIcon = (props: DoubleRightIconProps) => {
  const { size, color } = props;
  const { isDarkMode } = useContext(AppContext) as AppContextShape;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill={isDarkMode ? "white" : color}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.414376 1.46855C0.155619 1.1451 0.20806 0.673133 0.531506 0.414376C0.854953 0.155619 1.32692 0.20806 1.58568 0.531506L5.58568 5.53151C5.80481 5.80542 5.80481 6.19464 5.58568 6.46855L1.58568 11.4685C1.32692 11.792 0.854952 11.8444 0.531506 11.5857C0.208059 11.3269 0.155618 10.855 0.414376 10.5315L4.03956 6.00003L0.414376 1.46855ZM6.41438 1.46855C6.15562 1.1451 6.20806 0.673133 6.53151 0.414376C6.85495 0.155619 7.32692 0.20806 7.58568 0.531507L11.5857 5.53151C11.8048 5.80542 11.8048 6.19464 11.5857 6.46855L7.58568 11.4685C7.32692 11.792 6.85495 11.8444 6.53151 11.5857C6.20806 11.3269 6.15562 10.855 6.41437 10.5315L10.0396 6.00003L6.41438 1.46855Z"
        fill={isDarkMode ? "white" : color}
      />
    </svg>
  );
};

export default DoubleRightIcon;
