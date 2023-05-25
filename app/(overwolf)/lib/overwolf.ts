// Sometimes `overwolf` is not loaded if debug_url is set. A simple reload of the page will fix this.
export function waitForOverwolf(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!navigator.userAgent.includes("OverwolfClient")) {
      return reject("Not running in Overwolf");
    }
    function isOverwolfLoading() {
      return typeof overwolf === "undefined";
    }
    if (!isOverwolfLoading()) {
      overwolf.extensions.current.getManifest((manifest) =>
        console.log(`v${manifest.meta.version}`)
      );
      resolve();
    } else {
      console.log("Overwolf is not ready...");
      setTimeout(() => {
        if (isOverwolfLoading()) {
          console.log("Overwolf is still loading...reloading");
          location.reload();
        } else {
          resolve();
        }
      }, 1000);
    }
  });
}
