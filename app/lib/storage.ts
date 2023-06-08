import { Mutate, StoreApi, create } from "zustand";
import { persist } from "zustand/middleware";

type StoreWithPersist<State = any> = Mutate<
  StoreApi<State>,
  [["zustand/persist", State]]
>;

export const withStorageDOMEvents = (store: StoreWithPersist) => {
  const storageEventCallback = (e: StorageEvent) => {
    try {
      if (e.key && e.key === store.persist.getOptions().name && e.newValue) {
        store.persist.rehydrate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  window.addEventListener("storage", storageEventCallback);

  return () => {
    window.removeEventListener("storage", storageEventCallback);
  };
};

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

withStorageDOMEvents(useDiscoveredNodesStore);

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

withStorageDOMEvents(useSettingsStore);
