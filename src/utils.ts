import HubConnectionMock from "./types/HubConnectionMock.ts";
import IMockData from "./types/IMockData.ts";
import Log from "./log.ts";

export function isCypressRunning(): boolean {
  if (isSSR()) {
    return false;
  }
  return window.hasOwnProperty("Cypress");
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
  hubName: string
): HubConnectionMock | null {
  const data = getCypressSignalrMockData();
  return data.mocks.find((x) => x.name === hubName) ?? null;
}

export function isSSR(): boolean {
  if (typeof window === "undefined") {
    Log.error(
      "window is not defined. This most likely happens during SSR, which is not supported",
      false
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
