"use client";
import { ICONS } from "../lib/icons";
import { ALL_FILTERS } from "../lib/storage";
import { useDict } from "./(i18n)/i18n-provider";
import useFilters from "./use-filters";

export default function Filters() {
  const dict = useDict();
  const [filters, toggleFilter, setFilters] = useFilters();

  return (
    <div className="absolute top-full divide-y divide-neutral-700 border-t border-t-neutral-600 bg-neutral-900 text-gray-200 text-sm w-full md:border md:border-gray-600 md:rounded-lg md:mt-1">
      <div className="flex justify-center gap-2">
        <button
          className="p-2 uppercase hover:text-white"
          onClick={() => {
            setFilters(ALL_FILTERS);
          }}
        >
          Show All
        </button>
        <button
          className="p-2 uppercase hover:text-white"
          onClick={() => {
            setFilters([]);
          }}
        >
          Hide All
        </button>
      </div>
      {Object.entries(ICONS).map(([key, icon]) => (
        <button
          key={key}
          className={`flex gap-2 items-center hover:bg-neutral-700 p-2 w-full ${
            !filters.includes(key) ? "text-gray-500" : ""
          }`}
          onClick={() => {
            toggleFilter(key);
          }}
        >
          <svg viewBox="0 0 100 100" fill={icon.color} className="h-5">
            <path d={icon.path} />
          </svg>
          {dict.nodes[key as keyof typeof ICONS]}
        </button>
      ))}
    </div>
  );
}
