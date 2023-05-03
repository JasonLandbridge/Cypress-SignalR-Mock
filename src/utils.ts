import HubConnectionMock from "./types/HubConnectionMock.ts";
import IMockData from "./types/IMockData.ts";
import Log from "./log.ts";

export function isCypressRunning(): boolean {
  return window.hasOwnProperty("Cypress");
}

export function getCypressSignalrMockData(): IMockData {
  if (window.hasOwnProperty("cypress-signalr-mock")) {
    return window["cypress-signalr-mock"];
  }
  // This throws an error in the Cypress console
  Log.error('window["cypress-signalr-mock"] is not initialized.');
  return {} as IMockData;
}

export function getHubConnectionMock(
  hubName: string
): HubConnectionMock | null {
  return (
    getCypressSignalrMockData().mocks.find((x) => x.name === hubName) || null
  );
}
