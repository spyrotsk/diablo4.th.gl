"use client";

import { useState } from "react";
import { useDict } from "./(i18n)/i18n-provider";

export default function Search() {
  const [search, setSearch] = useState("");
  const dict = useDict();

  return (
    <label className="fixed left-3 top-3 z-[400] flex">
      <button className="flex absolute inset-y-0 left-0 items-center pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block w-6 text-gray-400"
        >
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </button>
      <input
        className="bg-dark border border-gray-600 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10 py-2.5"
        type="text"
        placeholder={dict.search.placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button className="flex absolute inset-y-0 right-0 items-center pr-2">
        <svg
          className="block w-6 text-gray-400 hover:text-gray-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </label>
  );
}
