"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { getCurrentWindow } from "../lib/windows";
import SVGIcons from "./svg-icons";

export default function Header() {
  const [version, setVersion] = useState("");
  const [currentWindow, setCurrentWindow] =
    useState<overwolf.windows.WindowInfo | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    getCurrentWindow().then((currentWindow) => {
      setIsMaximized(currentWindow.stateEx === "maximized");
      setCurrentWindow(currentWindow);
    });
  }, []);

  useLayoutEffect(() => {
    overwolf.extensions.current.getManifest((manifest) => {
      setVersion(manifest.meta.version);
    });
  }, []);

  return (
    <>
      <SVGIcons />
      <header
        className="flex items-center h-[30px]"
        onMouseDown={() => overwolf.windows.dragMove(currentWindow!.id)}
        onDoubleClick={() => overwolf.windows.maximize(currentWindow!.id)}
      >
        <h1 className="font-mono ml-2">Diablo 4 Map v{version}</h1>

        <div className="flex ml-auto ">
          <a
            href="https://discord.com/invite/NTZu8Px"
            target="_blank"
            className="h-[30px] w-[30px] flex items-center hover:bg-[#7289da]"
          >
            <svg>
              <use xlinkHref="#window-control_discord" />
            </svg>
          </a>
          <button
            className="h-[30px] w-[30px] flex items-center hover:bg-neutral-700"
            onClick={() => overwolf.windows.minimize(currentWindow!.id)}
          >
            <svg>
              <use xlinkHref="#window-control_minimize" />
            </svg>
          </button>
          {isMaximized ? (
            <button
              className="h-[30px] w-[30px] flex items-center hover:bg-neutral-700"
              onClick={() => overwolf.windows.restore(currentWindow!.id)}
            >
              <svg>
                <use xlinkHref="#window-control_restore" />
              </svg>
            </button>
          ) : (
            <button
              className="h-[30px] w-[30px] flex items-center hover:bg-neutral-700"
              onClick={() => overwolf.windows.maximize(currentWindow!.id)}
            >
              <svg>
                <use xlinkHref="#window-control_maximize" />
              </svg>
            </button>
          )}
          <button
            className="h-[30px] w-[30px] flex items-center hover:bg-red-600"
            id="close"
            onClick={() => overwolf.windows.close(currentWindow!.id)}
          >
            <svg>
              <use xlinkHref="#window-control_close" />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
