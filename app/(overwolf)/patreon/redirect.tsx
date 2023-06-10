"use client";
import { REDIRECT_URI } from "@/app/lib/env";
import { useEffect } from "react";

export default function Redirect() {
  useEffect(() => {
    window.location.replace(
      `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=-IaT42APWVbhLd4eq3R3o_kVzV7lwpDugFqoantEHL1k6UD7GlEH5OpldgIDIPs0&redirect_uri=${REDIRECT_URI}`
    );
  }, []);

  return (
    <div className="h-screen text-center pt-4 bg-black">
      Waiting for Patreon...
    </div>
  );
}
