import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const { pathname, search } = location;

  useEffect(() => {
    // Set the initial searchText from the URL query parameter
    const query = new URLSearchParams(search);
    const qParam = query.get("q");
    setSearchText(qParam || "");
  }, [search]);

  // Debounced search to minimize unnecessary navigation calls
  const handleSearch = debounce((text: string) => {
    const sanitizedPath = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    if (text.trim()) {
      navigate(`${sanitizedPath}?q=${text.trim()}`);
    } else {
      navigate(sanitizedPath); // Navigate without `q` if search is empty
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    handleSearch(value);
  };

  return (
    <div className="flex w-[30rem] font-openSans bg-white">
      <div className="w-[100%] flex items-center gap-[.1rem] border-2 h-[2.8rem] px-[1rem] rounded-full">
        <IoSearch className="text-[1.3rem] text-gray-400" />
        <Input
          value={searchText}
          onChange={handleInputChange}
          placeholder="Type here to Search"
          className="focus-visible:ring-0 outline-none border-none shadow-none placeholder:text-black/50 placeholder:font-openSans placeholder:font-[500]"
        />
      </div>
    </div>
  );
};

export default SearchBar;
