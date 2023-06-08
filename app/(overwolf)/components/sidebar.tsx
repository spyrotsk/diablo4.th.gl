import DiscoveredNodes from "@/app/components/discovered-nodes";
import ExternalLink from "@/app/components/external-link";
import { DISCOVER_LINKS } from "@/app/components/menu";
import Settings from "@/app/components/settings";
import Territories from "@/app/components/territories";
import Toggle from "@/app/components/toggle";
import { useSettingsStore } from "@/app/lib/storage";
import { togglePreferedWindow } from "../lib/windows";
import Ads from "./ads";
import Hotkey from "./hotkey";

export default function Sidebar() {
  const settingsStore = useSettingsStore();

  return (
    <aside className="w-[400px] z-[500] absolute right-0 top-[30px] bottom-0 flex flex-col justify-between text-gray-300 bg-black">
      <div className="p-2 flex flex-col gap-2 overflow-auto mr-0.5">
        <h2 className="category-title">Discovered Nodes</h2>
        <DiscoveredNodes />
        <h2 className="category-title">Settings</h2>
        <div className="flex">
          <span className="w-1/2">Show/Hide app</span>
          <Hotkey name="toggle_app" />
        </div>
        <div className="flex">
          <span className="w-1/2">Zoom in map</span>
          <Hotkey name="zoom_in_app" />
        </div>
        <div className="flex">
          <span className="w-1/2">Zoom out map</span>
          <Hotkey name="zoom_out_app" />
        </div>
        <div className="flex">
          <span className="w-1/2">Overlay Mode</span>
          <Toggle
            checked={!!settingsStore.overlayMode}
            onChange={(checked) => {
              settingsStore.setOverlayMode(checked);
              togglePreferedWindow();
            }}
          />
        </div>
        <p className="text-sm italic">
          This window is only visible as overlay in-game and have a transparent
          background. Deactive it, if you like to move this window to second
          screen or to ALT+TAB it.
        </p>
        <Settings />
        <h2 className="category-title">Territories</h2>
        <Territories />
        <h2 className="category-title">Community</h2>
        <ExternalLink
          href="https://discord.com/invite/NTZu8Px"
          text="Discord"
        />
        <h2 className="category-title">Discover</h2>
        {DISCOVER_LINKS.map(({ href, text }) => (
          <ExternalLink key={href} href={href} text={text} />
        ))}
        <h2 className="category-title">Contribute</h2>
        <ExternalLink
          href="https://github.com/lmachens/diablo4.th.gl"
          text="GitHub"
        />
      </div>
      <Ads />
    </aside>
  );
}
