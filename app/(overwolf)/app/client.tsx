"use client";
import { waitForOverwolf } from "../lib/overwolf";

export default function AppClient() {
  return <></>;
}

waitForOverwolf()
  .then(() => {
    console.log("Init app");
  })
  .catch((error) => console.warn(error));
