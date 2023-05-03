import { getHubConnectionMock } from "./lib";
import Log from "./log";
import IServerInvoke from "./types/IServerInvoke";
import { Cypress } from "local-cypress";
import { isCypressRunning } from "./utils.ts";

export function setupCypressCommands() {
  if (!isCypressRunning()) {
    Log.info("Cypress is not running, skipping setup of Cypress commands");
    return;
  }

  Cypress.Commands.add(
    "signalrPublish",
    (hubName: string, action: string, payload: any) => {
      const hubConnectionMock = getHubConnectionMock(hubName);
      if (!hubConnectionMock) {
        throw new Error(
          `signalrPublish - HubConnectionMock not found for ${hubName}`
        );
      }
      hubConnectionMock.publish(action, payload);
    }
  );

  Cypress.Commands.add(
    "signalrVerify",
    (
      hubName: string,
      action: string,
      times: number = 1,
      callback?: (invokes: IServerInvoke[]) => void
    ) => {
      const hubConnectionMock = getHubConnectionMock(hubName);
      if (!hubConnectionMock) {
        throw new Error(
          `signalrVerify - HubConnectionMock not found for ${hubName}`
        );
      }
      hubConnectionMock.verify(action, times, callback);
    }
  );

  Cypress.Commands.add("signalrPrintData", () => {
    Log.debug("signalrPrintData");
    Log.info("signalrPrintData");
    Log.warn("signalrPrintData");
    Log.error("signalrPrintData");
  });
}
