import { HubConnection } from "@microsoft/signalr";
import IMockData from "./types/IMockData";
import IServerInvoke from "./types/IServerInvoke";
export declare function useCypressSignalRMock(name: string, { debug, enableForVitest, }?: Partial<{
    debug?: boolean;
    enableForVitest?: boolean;
}>): HubConnection | null;
/**
 * Typings
 */
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
            hubPublish(hubName: string, messageType: string, payload: any): Chainable<Subject>;
            /**
             * Verifies that a message was sent from the Client => Server
             * @param hubName The name of the hub
             * @param messageType The name of the message type
             * @param callback A callback function that will be called with the invokes
             */
            hubVerifyInvokes(hubName: string, messageType: string, callback?: (invokes: IServerInvoke[]) => void): Chainable<Subject>;
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
export { hubPublish, hubVerify, hubClear, hubPrintData, } from "./cypress-commands";
