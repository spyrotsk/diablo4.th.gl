"use client";
import SVGIcons from "./svg-icons";

export default function Header() {
  return (
    <>
      <SVGIcons />
      <header className="flex h-[30px]">
        <h1 className="version">Diablo 4 Gaming Lair</h1>
        <div className="window-controls-group">
          <a
            href="https://discord.com/invite/NTZu8Px"
            target="_blank"
            className="icon window-control window-control-social discord"
          >
            <svg>
              <use xlinkHref="#window-control_discord" />
            </svg>
          </a>
          <button className="icon window-control" id="minimize">
            <svg>
              <use xlinkHref="#window-control_minimize" />
            </svg>
          </button>
          <button className="icon toggle-icons window-control" id="maximize">
            <svg>
              <use xlinkHref="#window-control_maximize" />
            </svg>
            <svg>
              <use xlinkHref="#window-control_restore" />
            </svg>
          </button>
          <button
            className="icon window-control window-control-close"
            id="close"
            onClick={() =>
              overwolf.windows.getCurrentWindow((result) =>
                overwolf.windows.close(result.window.id)
              )
            }
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
