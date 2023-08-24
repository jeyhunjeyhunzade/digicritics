import { useState } from "react";

const HeartIcon = ({ size }: { size: number }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="delay-30 transition ease-in"
      onClick={(e) => {
        e.preventDefault();
        handleLike();
      }}
    >
      {liked ? (
        <path
          id="Vector"
          d="M11.765 2.70229L11 3.52422L10.235 2.70229C8.12233 0.432572 4.69709 0.43257 2.58447 2.70229C0.471845 4.972 0.471844 8.65194 2.58447 10.9217L9.4699 18.3191C10.315 19.227 11.685 19.227 12.5301 18.3191L19.4155 10.9217C21.5282 8.65194 21.5282 4.972 19.4155 2.70229C17.3029 0.432571 13.8777 0.432571 11.765 2.70229Z"
          fill="#D20F0F"
        />
      ) : (
        <path
          id="Vector"
          d="M11.765 2.70229L11 3.52422L10.235 2.70229C8.12233 0.432572 4.69709 0.43257 2.58447 2.70229C0.471845 4.972 0.471844 8.65194 2.58447 10.9217L9.4699 18.3191C10.315 19.227 11.685 19.227 12.5301 18.3191L19.4155 10.9217C21.5282 8.65194 21.5282 4.972 19.4155 2.70229C17.3029 0.432571 13.8777 0.432571 11.765 2.70229Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};

export default HeartIcon;
