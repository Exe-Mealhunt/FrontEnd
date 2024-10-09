"use client";
import React, { useEffect, useState } from "react";

import { useDebounce } from "../../../helpers/debounce";

type SearchInputProps = {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
};

export default function SearchInput({
  placeholder,
  onSearch,
}: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  return (
    <label className="input input-bordered flex items-center gap-2 text-black bg-white rounded-none">
      <input
        type="text"
        className="grow"
        onChange={handleInputChange}
        value={searchTerm}
        placeholder={placeholder}
      />
      {searchTerm ? (
        <svg
          onClick={clearInput}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="black"
          className="h-6 w-6 opacity-70 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M2.293 2.293a1 1 0 011.414 0L8 7.586l4.293-4.293a1 1 0 011.414 1.414L9.414 9l4.293 4.293a1 1 0 01-1.414 1.414L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L6.586 9 2.293 4.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 14"
          fill="black"
          className="h-6 w-6 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </label>
  );
}
