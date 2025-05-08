import React, { memo } from "react";

const SearchBar = memo(({ searchText, setSearchText }) => {
    return (
        <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-input" className="block text-gray-700 mb-2">بحث سريع</label>
            <input
                id="search-input"
                type="text"
                placeholder="ابحث بالاسم أو الرقم..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search"
            />
        </div>
    );
});

export default SearchBar;