import { PropsWithChildren } from "react";

const Button = ({
  children,
  onClick,
}: PropsWithChildren<{
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}>) => {
  return (
    <button
      className="ml-2 rounded-md bg-[#000000] p-1.5 px-4 font-mono font-bold text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
