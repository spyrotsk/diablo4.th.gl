import { useSearchParams } from "next/navigation";
import { useOverwolfRouter } from "../(overwolf)/components/overwolf-router";
import { ICONS } from "../lib/icons";

export default function useFilters() {
  const searchParams = useSearchParams();
  const router = useOverwolfRouter();

  const isOverwolf = "value" in router;
  const filters =
    (isOverwolf ? router.value.filters : searchParams.get("filters"))?.split(
      ","
    ) ?? Object.keys(ICONS);

  return filters;
}
