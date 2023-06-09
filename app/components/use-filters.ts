import { ICONS } from "../lib/icons";
import { useSettingsStore } from "../lib/storage";

export const ALL_FILTERS = Object.keys(ICONS);
export default function useFilters() {
  const settingsStore = useSettingsStore();

  const setFilters = (newFilters: string[]) => {
    newFilters = newFilters.filter((f) => f in ICONS);
    settingsStore.setFilters(newFilters);
  };

  const toggleFilter = (key: string) => {
    const newFilters = settingsStore.filters.includes(key)
      ? settingsStore.filters.filter((f) => f !== key)
      : [...settingsStore.filters, key];
    setFilters(newFilters);
  };
  return [settingsStore.filters, toggleFilter, setFilters] as const;
}
