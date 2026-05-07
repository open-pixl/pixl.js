export const PIXL_GITHUB_PAGES_BASE = "/pixl.js/" as const;

export const NRF_DFU_SERVICE_UUID = "0000fe59-0000-1000-8000-00805f9b34fb" as const;

export type HardwareScreen = "LCD" | "OLED" | "unknown";

export type BrowserSupport = {
  webBluetooth: boolean;
  browser: "chrome" | "edge" | "other";
  platform: "android" | "macos" | "ios" | "other";
};

export type FirmwareArtifact = {
  board: Exclude<HardwareScreen, "unknown">;
  version: string;
  otaZipUrl: string;
  fullHexUrl: string;
  sha256: string;
};

export function detectBrowserSupport(userAgent: string, hasBluetooth: boolean): BrowserSupport {
  const normalized = userAgent.toLowerCase();
  const browser = normalized.includes("edg/") || normalized.includes("edga/")
    ? "edge"
    : normalized.includes("chrome/")
      ? "chrome"
      : "other";
  const platform = normalized.includes("android")
    ? "android"
    : normalized.includes("mac os x") && !normalized.includes("iphone") && !normalized.includes("ipad")
      ? "macos"
      : normalized.includes("iphone") || normalized.includes("ipad")
        ? "ios"
        : "other";

  return {
    browser,
    platform,
    webBluetooth: hasBluetooth && (browser === "chrome" || browser === "edge") && platform !== "ios",
  };
}
