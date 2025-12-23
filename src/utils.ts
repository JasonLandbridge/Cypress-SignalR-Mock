import HubConnectionMock from "./types/HubConnectionMock.ts";
import IMockData from "./types/IMockData.ts";
import Log from "./log.ts";

export function isCypressRunning(): boolean {
  if (isSSR()) {
    return false;
  }

  // Cypress's Test Replay data capture sets a default Cypress property on window
  // for all iframes, which allows window.Cypress to be overridden. However, even
  // with this property present, window.Cypress may remain undefined.
  //
  // We use !! to ensure we return true only if window.Cypress is truly defined,
  // rather than relying solely on the presence of the property. This prevents
  // runtime errors when the property exists but is actually undefined.
  // @ts-ignore - Cypress is not defined in the type system
  return !!window["Cypress"];
}

export function getCypressSignalrMockData(): IMockData {
  if (!isSSR() && window["cypress-signalr-mock"]) {
    return window["cypress-signalr-mock"];
  }
  // Initialize the global object
  clearCypressSignalrMockData();
  return getCypressSignalrMockData();
}

export function setCypressSignalrMockData(value: IMockData): void {
  if (isSSR()) {
    return;
  }
  window["cypress-signalr-mock"] = value;
}

export function clearCypressSignalrMockData(): void {
  setCypressSignalrMockData(defaultCypressSignalrMockData());
}

export function defaultCypressSignalrMockData(): IMockData {
  return {
    mocks: [],
  };
}

export function getHubConnectionMock(
  hubName: string,
): HubConnectionMock | null {
  const data = getCypressSignalrMockData();
  return data.mocks.find((x) => x.name === hubName) ?? null;
}

export function isSSR(): boolean {
  if (typeof window === "undefined") {
    Log.error(
      "window is not defined. This most likely happens during SSR, which is not supported",
      false,
    );
    return true;
  }
  return false;
}

export function isInVitestMode(): boolean {
  return (
    typeof process !== "undefined" &&
    process?.env?.hasOwnProperty("VITEST") &&
    process.env.VITEST === "true"
  );
}
