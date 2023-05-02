// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

import { HubConnection } from "@microsoft/signalr";
import HubConnectionMock from "./types/HubConnectionMock";
import { setupCypressCommands } from "./cypress-commands";
import { getData } from "./lib";
import IMockData from "./types/IMockData";

setupCypressCommands();

export function useCypressSignalRMock(
  name: string,
  config?: {
    debug: boolean;
  }
): HubConnection | null {
  // @ts-ignore
  if (window.Cypress) {
    const mock = new HubConnectionMock(name);
    getData().mocks.push(mock);
    // @ts-ignore
    return <HubConnection>mock;
  }
  return null;
}

/**
 * Typings
 */
// Initialize the global object
(<any>window)["cypress-signalr-mock"] = {
  mocks: [],
};

// This cannot be in a index.d.ts file because it will not be loaded by Cypress
declare global {
  interface Window {
    "cypress-signalr-mock": IMockData;
  }

  namespace Cypress {
    interface Chainable<Subject = any> {
      signalrPublish(
        hubName: string,
        action: string,
        payload: any
      ): Chainable<Subject>;

      signalrPrintData(): Chainable<Subject>;
    }
  }
}
