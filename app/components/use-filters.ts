import { useSearchParams } from "next/navigation";
import { useOverwolfRouter } from "../(overwolf)/components/overwolf-router";
import { ICONS } from "../lib/icons";
import { useUpdateSearchParams } from "../lib/search-params";

export default function useFilters() {
  const searchParams = useSearchParams();
  const router = useOverwolfRouter();
  const updateSearchParams = useUpdateSearchParams();

  const isOverwolf = "value" in router;
  const filters =
    (isOverwolf ? router.value.filters : searchParams.get("filters"))?.split(
      ","
    ) ?? Object.keys(ICONS);

  const toggleFilter = (key: string) => {
    let newFilters = filters.includes(key)
      ? filters.filter((f) => f !== key)
      : [...filters, key];
    if (newFilters.length === Object.keys(ICONS).length) {
      newFilters = [];
    }
    const newFiltersString = newFilters.join(",");
    if ("update" in router) {
      router.update({ filters: newFiltersString });
    } else {
      updateSearchParams("filters", newFiltersString);
    }
  };
  return [filters, toggleFilter] as const;
}
