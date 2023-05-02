// @ts-ignore
import { getHubConnectionMock } from "./lib";
import Log from "./log/log";

/// <reference path="index.d.ts" />

export function setupCypressCommands() {
  Cypress.Commands.add(
    "signalrPublish",
    (hubName: string, action: string, payload: any) => {
      const hubConnectionMock = getHubConnectionMock(hubName);
      if (!hubConnectionMock) {
        throw new Error(`HubConnectionMock not found for ${hubName}`);
      }
      hubConnectionMock.publish(action, payload);
    }
  );

  Cypress.Commands.add("signalrPrintData", () => {
    Log.debug("signalrPrintData");
    Log.info("signalrPrintData");
    Log.warn("signalrPrintData");
    Log.error("signalrPrintData");
  });
}
