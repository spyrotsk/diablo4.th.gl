import { useSettingsStore } from "../lib/storage";
import Toggle from "./toggle";

export default function Settings() {
  const settings = useSettingsStore();

  return (
    <>
      <div className="flex">
        <span className="w-1/2">Show Territory Names</span>
        <Toggle
          checked={!!settings.showTerritoryNames}
          onChange={settings.toggleShowTerritoryNames}
        />
      </div>
    </>
  );
}
