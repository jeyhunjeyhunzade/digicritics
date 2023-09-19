import { useContext } from "react";
import { AppContext } from "@app/pages/App";
import { AppContextShape } from "@app/types/types";

interface RightArrowIconProps {
  size: number;
  color?: string;
}

const RightArrowIcon = (props: RightArrowIconProps) => {
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
        d="M0.531491 11.5856C0.208045 11.3269 0.155604 10.8549 0.414361 10.5315L4.03954 5.99997L0.414362 1.46849C0.155605 1.14505 0.208046 0.673077 0.531493 0.41432C0.854939 0.155562 1.32691 0.208004 1.58567 0.53145L5.58566 5.53145C5.8048 5.80537 5.8048 6.19458 5.58566 6.46849L1.58566 11.4685C1.32691 11.7919 0.854938 11.8444 0.531491 11.5856Z"
        fill={isDarkMode ? "white" : color}
      />
    </svg>
  );
};

export default RightArrowIcon;
