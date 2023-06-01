"use client";
import type { EventOptions, PlausibleOptions } from "plausible-tracker";
import Plausible from "plausible-tracker";
import { useEffect } from "react";

let plausible: ReturnType<typeof Plausible> | null = null;
export const initPlausible = () => {
  console.log("initPlausible", process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  if (
    typeof process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN === "string" &&
    typeof process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST === "string" &&
    !plausible
  ) {
    plausible = Plausible({
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
      apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST,
    });
    plausible.enableAutoPageviews();
  }
};

export const trackEvent = (
  eventName: string,
  options?: EventOptions | undefined,
  eventData?: PlausibleOptions | undefined
) => {
  if (plausible) {
    plausible.trackEvent(eventName, options, eventData);
  }
};

export const trackOutboundLinkClick = (url: string) => {
  trackEvent("Outbound Link: Click", { props: { url: url } });
};

export default function PlausibleTracker() {
  useEffect(() => {
    initPlausible();
  }, []);

  return <></>;
}
