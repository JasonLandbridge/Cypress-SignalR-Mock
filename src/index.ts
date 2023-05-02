// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

import { HubConnection } from "@microsoft/signalr";
import HubConnectionMock from "./types/HubConnectionMock";
import { setupCypressCommands } from "./cypress-commands";
import { getData } from "./lib";

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

declare global {
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
