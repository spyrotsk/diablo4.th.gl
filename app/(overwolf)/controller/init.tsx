"use client";
import { useEffect } from "react";
import { GAME_CLASS_ID, HOTKEYS, WINDOWS } from "../lib/config";
import { getRunningGameInfo } from "../lib/games";
import { waitForOverwolf } from "../lib/overwolf";
import {
  closeMainWindow,
  closeWindow,
  getPreferedWindowName,
  moveToOtherScreen,
  restoreWindow,
  toggleWindow,
} from "../lib/windows";

let initialized = false;
export default function Init() {
  useEffect(() => {
    if (initialized) {
      return;
    }
    waitForOverwolf()
      .then(() => {
        initialized = true;
        initController();
      })
      .catch((error) => console.warn(error));
  }, []);

  return <></>;
}

async function initController() {
  console.log("Init controller");
  const openApp = async () => {
    const runningGameInfo = await getRunningGameInfo(GAME_CLASS_ID);
    if (runningGameInfo) {
      const preferedWindowName = await getPreferedWindowName();
      const windowId = await restoreWindow(preferedWindowName);
      if (preferedWindowName === WINDOWS.DESKTOP) {
        moveToOtherScreen(windowId, runningGameInfo.monitorHandle.value);
      }
    } else {
      restoreWindow(WINDOWS.DESKTOP);
    }
  };
  openApp();

  overwolf.extensions.onAppLaunchTriggered.addListener(openApp);

  overwolf.settings.hotkeys.onPressed.addListener(async (event) => {
    if (event.name === HOTKEYS.TOGGLE_APP) {
      const preferedWindowName = await getPreferedWindowName();
      toggleWindow(preferedWindowName);
    }
  });

  overwolf.games.onGameInfoUpdated.addListener(async (event) => {
    if (event.runningChanged && event.gameInfo?.classId === GAME_CLASS_ID) {
      const preferedWindowName = await getPreferedWindowName();
      if (event.gameInfo.isRunning) {
        if (preferedWindowName === WINDOWS.OVERLAY) {
          restoreWindow(WINDOWS.OVERLAY);
          closeWindow(WINDOWS.DESKTOP);
        } else {
          restoreWindow(WINDOWS.DESKTOP);
          closeWindow(WINDOWS.OVERLAY);
        }
      } else if (preferedWindowName === WINDOWS.OVERLAY) {
        closeMainWindow();
      }
    }
  });
}
