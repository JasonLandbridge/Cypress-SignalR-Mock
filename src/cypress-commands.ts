/// <reference types="cypress" />
import Log from "./log";
import IServerInvoke from "./types/IServerInvoke";
import {
  getCypressSignalrMockData,
  getHubConnectionMock,
  isCypressRunning,
} from "./utils.ts";

export function setupCypressCommands() {
  if (!isCypressRunning()) {
    Log.info("Cypress is not running, skipping setup of Cypress commands");
    return;
  }

  // @ts-ignore
  Cypress.Commands.add("hubPublish", hubPublish);

  // @ts-ignore
  Cypress.Commands.add("hubVerify", hubVerify);

  // @ts-ignore
  Cypress.Commands.add("hubPrintData", hubPrintData);
}

export function hubPublish(hubName: string, action: string, payload: any) {
  const hubConnectionMock = getHubConnectionMock(hubName);
  if (!hubConnectionMock) {
    Log.error(`[cy.hubPublish] - HubConnectionMock not found for ${hubName}`);
    return;
  }
  hubConnectionMock.publish(action, payload);
}

export function hubVerify(
  hubName: string,
  action: string,
  times: number = 1,
  callback?: (invokes: IServerInvoke[]) => void
) {
  const hubConnectionMock = getHubConnectionMock(hubName);
  if (!hubConnectionMock) {
    Log.error(`[cy.hubVerify] - HubConnectionMock not found for ${hubName}`);
    return;
  }
  hubConnectionMock.verify(action, times, callback);
}

export function hubPrintData() {
  Log.info(
    'Current window["cypress-signalr-mock"] data:',
    getCypressSignalrMockData()
  );
}
