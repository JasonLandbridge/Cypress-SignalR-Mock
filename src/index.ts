// load type definitions that come with Cypress module
// and then add our new commands to the "cy" object
/// <reference types="cypress" />

import { HubConnection } from "@microsoft/signalr";
import HubConnectionMock from "./types/HubConnectionMock";
import { setupCypressCommands } from "./cypress-commands";
import IMockData from "./types/IMockData";
import IServerInvoke from "./types/IServerInvoke";
import {
  getCypressSignalrMockData,
  isCypressRunning,
  isInVitestMode,
} from "./utils.ts";
import Log from "./log.ts";

setupCypressCommands();
useCypressSignalRMock("default");

export function useCypressSignalRMock(
  name: string,
  {
    debug,
    enableForVitest,
  }: Partial<{ debug?: boolean; enableForVitest?: boolean }> = {}
): HubConnection | null {
  if (debug) {
    Log.setLogLevel(4);
  }
  if (!enableForVitest && isInVitestMode()) {
    Log.info(
      `Vitest is running but 'enableForVitest' is ${enableForVitest}, skip enabling CypressSignalRMock...`
    );
  }

  if (isCypressRunning() || (enableForVitest && isInVitestMode())) {
    const mock = new HubConnectionMock(name);
    getCypressSignalrMockData().mocks.push(mock);
    return <HubConnection>(mock as unknown);
  }
  return null;
}

/**
 * Typings
 */
// This cannot be in a index.d.ts file otherwise it will not be loaded in by Cypress
declare global {
  interface Window {
    "cypress-signalr-mock": IMockData;
  }

  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Simulates a message sent from the Server => Client
       * @param hubName The name of the hub
       * @param messageType The name of the message type
       * @param payload The payload to send with the action
       */
      hubPublish(
        hubName: string,
        messageType: string,
        payload: any
      ): Chainable<Subject>;

      /**
       * Verifies that a message was sent from the Client => Server
       * @param hubName The name of the hub
       * @param messageType The name of the message type
       * @param callback A callback function that will be called with the invokes
       */
      hubVerifyInvokes(
        hubName: string,
        messageType: string,
        callback?: (invokes: IServerInvoke[]) => void
      ): Chainable<Subject>;

      /**
       * Clears all data from the window["cypress-signalr-mock"] object
       */
      hubClear(): Chainable<Subject>;

      /**
       * Prints the current data to console in the window["cypress-signalr-mock"] object
       */
      hubPrintData(): Chainable<Subject>;
    }
  }
}

export {
  hubPublish,
  hubVerify,
  hubClear,
  hubPrintData,
} from "./cypress-commands";
