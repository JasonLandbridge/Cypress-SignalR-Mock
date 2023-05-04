import HubConnectionMock from "./types/HubConnectionMock.ts";
import IMockData from "./types/IMockData.ts";

export function isCypressRunning(): boolean {
  return window.hasOwnProperty("Cypress");
}

export function getCypressSignalrMockData(): IMockData {
  if (window.hasOwnProperty("cypress-signalr-mock")) {
    return window["cypress-signalr-mock"];
  }
  // Initialize the global object
  clearCypressSignalrMockData();
  return getCypressSignalrMockData();
}

export function setCypressSignalrMockData(value: IMockData): void {
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
  return (
    getCypressSignalrMockData().mocks.find((x) => x.name === hubName) || null
  );
}
