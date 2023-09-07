const SearchBarSpinner = () => {
  return (
    <div
      role="status"
      className="mt-4 flex w-full animate-pulse flex-col flex-col items-center justify-start py-4"
    >
      <div className="mb-2 flex w-full">
        <div className="flex flex-col">
          <div className="h-2 w-[150px] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full flex-col">
          <div className="mb-1 h-2 w-[80%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="mb-1 h-2 w-[90%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-2 w-[80%] rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
        <div className="h-[72px] w-[100px] rounded-[8px] bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="flex w-full">
        <div>
          <svg
            className="mr-4 h-[20px] w-[20px] text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
        <div className="h-1 w-[10%] self-center rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default SearchBarSpinner;
