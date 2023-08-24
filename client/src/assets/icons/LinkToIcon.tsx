const LinkToIcon = ({ size }: { size: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M21.5 8.99999L21.5 3M21.5 3L15.5 3M21.5 3L10.5 14"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 5H7.5C5.29086 5 3.5 6.79086 3.5 9V17C3.5 19.2091 5.29086 21 7.5 21H15.5C17.7091 21 19.5 19.2091 19.5 17V12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LinkToIcon;
