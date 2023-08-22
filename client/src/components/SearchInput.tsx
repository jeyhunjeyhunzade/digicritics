import SearchIcon from "@app/assets/icons/SearchIcon";

const SearchInput = () => {
  return (
    <div className="relative mr-6">
      <input
        type="text"
        placeholder="Search..."
        className="border-0 border-b-2 border-white bg-[transparent] px-0 py-2 pr-10 text-white placeholder-white outline-none focus:border-white focus:outline-none focus:ring-0"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchInput;
