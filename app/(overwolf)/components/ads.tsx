"use client";
import { useAccountStore, useSettingsStore } from "@/app/lib/storage";
import type { OwAd } from "@overwolf/types/owads";
import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    OwAd?: typeof OwAd;
  }
}

function Ads() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isPatron = useAccountStore((state) => state.isPatron);
  const overlayTransparentMode = useSettingsStore(
    (state) => state.overlayTransparentMode
  );

  if (isPatron) {
    return <></>;
  }

  function onOwAdReady() {
    if (typeof window.OwAd === "undefined" || containerRef.current === null) {
      return;
    }

    new window.OwAd(containerRef.current, {
      size: { width: 400, height: 300 },
    });
  }

  return (
    <>
      <Script
        src="https://content.overwolf.com/libs/ads/latest/owads.min.js"
        async
        onLoad={onOwAdReady}
      />

      <div
        ref={containerRef}
        className={`fixed left-0 bottom-0 z-[9999] w-[400px] h-[300px] ${
          overlayTransparentMode ? "" : "bg-neutral-900"
        } bg-[url('/ads-background.webp')]`}
      />
    </>
  );
}

export default Ads;
