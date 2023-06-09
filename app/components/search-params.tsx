"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useOverwolfRouter } from "../(overwolf)/components/overwolf-router";
import { useUpdateSearchParams } from "../lib/search-params";
import { ALL_FILTERS } from "../lib/storage";
import useFilters from "./use-filters";

export default function SearchParams() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const router = useOverwolfRouter();
  const [filters] = useFilters();

  useEffect(() => {
    if (filters.join(",") !== searchParams.get("filters")) {
      if (!("update" in router)) {
        let filtersString = "";
        if (filters.length === 0) {
          filtersString = "none";
        } else if (filters.length !== ALL_FILTERS.length) {
          filtersString = filters.join(",");
        }
        updateSearchParams("filters", filtersString);
      }
    }
  }, [filters, updateSearchParams, searchParams]);

  return <></>;
}
