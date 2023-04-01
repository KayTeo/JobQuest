import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchBar = ({ search, setSearch }) => {
    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <label htmlFor="search" className="absolute left-[-99999px]">
                Search
            </label>
            <div className="flex h-6 w-full items-center justify-between gap-1 rounded-full bg-gray-200 p-1 px-2">
                <input
                    id="search"
                    type="text"
                    placeholder="Search For Item..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-inherit focus:outline-0"
                />
                <MagnifyingGlassIcon className="w-4" />
            </div>
        </form>
    );
};

export default SearchBar;
