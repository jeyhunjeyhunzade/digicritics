import { useContext } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";

interface DoubleLeftIconProps {
  size: number;
  color?: string;
}

const DoubleLeftIcon = (props: DoubleLeftIconProps) => {
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
        d="M11.5856 1.46855C11.8444 1.1451 11.7919 0.673133 11.4685 0.414376C11.145 0.155619 10.6731 0.20806 10.4143 0.531506L6.41432 5.53151C6.19519 5.80542 6.19519 6.19464 6.41432 6.46855L10.4143 11.4685C10.6731 11.792 11.145 11.8444 11.4685 11.5857C11.7919 11.3269 11.8444 10.855 11.5856 10.5315L7.96044 6.00003L11.5856 1.46855ZM5.58562 1.46855C5.84438 1.1451 5.79194 0.673133 5.46849 0.414376C5.14505 0.155619 4.67308 0.20806 4.41432 0.531507L0.414322 5.53151C0.195191 5.80542 0.195191 6.19464 0.414322 6.46855L4.41432 11.4685C4.67308 11.792 5.14505 11.8444 5.46849 11.5857C5.79194 11.3269 5.84438 10.855 5.58563 10.5315L1.96044 6.00003L5.58562 1.46855Z"
        fill={isDarkMode ? "white" : color}
      />
    </svg>
  );
};

export default DoubleLeftIcon;
