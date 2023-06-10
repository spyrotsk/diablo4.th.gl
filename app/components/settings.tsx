import { useSettingsStore } from "../lib/storage";
import Toggle from "./toggle";

export default function Settings() {
  const settingsStore = useSettingsStore();

  return (
    <>
      <div className="flex">
        <span className="w-1/2">Show Territory Names</span>
        <Toggle
          checked={!!settingsStore.showTerritoryNames}
          onChange={settingsStore.toggleShowTerritoryNames}
        />
      </div>
      <div className="flex">
        <span className="w-1/2">Icon Size</span>
        <input
          className="w-5/12"
          type="range"
          value={settingsStore.iconSize}
          min={0.4}
          max={2}
          step={0.1}
          onChange={(event) => settingsStore.setIconSize(+event.target.value)}
        />
      </div>
    </>
  );
}
