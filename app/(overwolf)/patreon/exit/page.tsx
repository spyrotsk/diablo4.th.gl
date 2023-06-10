"use client";
import { useSearchParams } from "next/navigation";

export default async function PatreonExit() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!code) {
    return (
      <div className="h-screen text-center pt-4 bg-black">
        Something went wrong, please try again.
      </div>
    );
  }
  return (
    <div className="h-screen text-center pt-4 bg-black">
      {code ? (
        <>
          <p className="my-2">
            Thank you for your support 🤘. Please click the following button to
            sync your subscription status with the Overwolf app.
          </p>
          <a
            href={`overwolf-extension://olbbpfjombddiijdbjeeegeclifleaifdeonllfd/patreon.html#code=${code}`}
            className="block w-fit mx-auto p-2 uppercase text-white bg-[#ff424d] hover:bg-[#ca0f25]"
          >
            Send Patreon Code to App
          </a>
        </>
      ) : (
        "Something went wrong, please try again."
      )}
    </div>
  );
}
