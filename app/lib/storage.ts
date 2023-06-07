import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDiscoveredNodesStore = create(
  persist<{
    discoveredNodes: string[];
    markDiscoveredNode: (node: string) => void;
    unmarkDiscoveredNode: (node: string) => void;
  }>(
    (set, get) => ({
      discoveredNodes: [],
      markDiscoveredNode: (node) =>
        set({ discoveredNodes: [...get().discoveredNodes, node] }),
      unmarkDiscoveredNode: (node) =>
        set({
          discoveredNodes: get().discoveredNodes.filter(
            (discoveredNode) => discoveredNode !== node
          ),
        }),
    }),
    {
      name: "discovered-nodes-storage",
    }
  )
);

export const useSettingsStore = create(
  persist<{
    // App and Website
    showTerritoryNames: boolean;
    toggleShowTerritoryNames: () => void;
    iconSize: number;
    setIconSize: (iconSize: number) => void;
    // App only
    overlayMode: boolean | null;
    setOverlayMode: (overlayMode: boolean) => void;
  }>(
    (set) => ({
      showTerritoryNames: true,
      iconSize: 1,
      setIconSize: (iconSize) => set({ iconSize }),
      toggleShowTerritoryNames: () =>
        set((state) => ({
          showTerritoryNames: !state.showTerritoryNames,
        })),
      overlayMode: null,
      setOverlayMode: (overlayMode) =>
        set({
          overlayMode,
        }),
    }),
    {
      name: "settings-storage",
    }
  )
);
