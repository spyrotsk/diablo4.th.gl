import Script from "next/script";
import { useEffect, useState } from "react";

type NitroAds = {
  // eslint-disable-next-line no-unused-vars
  createAd: (id: string, options: any) => void;
  addUserToken: () => void;
  queue: ([string, any, (value: unknown) => void] | [string, any])[];
};

interface MyWindow extends Window {
  nitroAds: NitroAds;
}
declare let window: MyWindow;

window.nitroAds = window.nitroAds || {
  createAd: function () {
    return new Promise(function (e) {
      // eslint-disable-next-line prefer-rest-params
      window.nitroAds.queue.push(["createAd", arguments, e]);
    });
  },
  addUserToken: function () {
    // eslint-disable-next-line prefer-rest-params
    window.nitroAds.queue.push(["addUserToken", arguments]);
  },
  queue: [],
};

export default function NitroPay() {
  const [showFallback, setShowFallback] = useState<boolean | null>(null);

  const handleLoad = () => {
    setShowFallback(false);
    window["nitroAds"].createAd("diablo4-video", {
      format: "video-nc",
    });
  };

  useEffect(() => {
    if (showFallback === false) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setShowFallback(true);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showFallback]);

  return (
    <>
      <Script
        src="https://s.nitropay.com/ads-1487.js"
        async
        data-cfasync="false"
        onLoad={handleLoad}
        onError={() => setShowFallback(true)}
      />
      <div id="diablo4-video" className={showFallback ? "" : "w-full h-56"} />
      {/* {showFallback && <div>Fallback</div>} */}
    </>
  );
}
