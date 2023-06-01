"use client";
import type { OwAd } from "@overwolf/types/owads";
import Script from "next/script";
import { useRef, useState } from "react";

declare global {
  interface Window {
    OwAd?: typeof OwAd;
  }
}

function Ads() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function onOwAdReady() {
    if (typeof window.OwAd === "undefined" || containerRef.current === null) {
      return;
    }

    const ad = new window.OwAd(containerRef.current, {
      size: { width: 400, height: 300 },
    });

    ad.addEventListener("display_ad_loaded", () => {
      setIsPlaying(true);
    });

    ad.addEventListener("impression", () => {
      setIsPlaying(true);
    });

    ad.addEventListener("complete", () => {
      setIsPlaying(false);
    });
    ad.addEventListener("error", () => {
      setIsPlaying(false);
    });
  }

  return (
    <>
      <Script
        src="https://content.overwolf.com/libs/ads/latest/owads.min.js"
        async
        onLoad={onOwAdReady}
      />
      <aside
        className="absolute bottom-0 right-0 z-[500] w-[400px] h-[300px]"
        style={isPlaying ? {} : { pointerEvents: "none" }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 z-[500] w-[400px] h-[300px]"
        />
      </aside>
    </>
  );
}

export default Ads;
