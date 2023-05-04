import { HubConnection } from "@microsoft/signalr";
import IMockData from "./types/IMockData";
import IServerInvoke from "./types/IServerInvoke";
export declare function useCypressSignalRMock(name: string, config?: {
    debug: boolean;
}): HubConnection | null;
declare global {
    interface Window {
        "cypress-signalr-mock": IMockData;
    }
    namespace Cypress {
        interface Chainable<Subject = any> {
            hubPublish(hubName: string, action: string, payload: any): Chainable<Subject>;
            hubVerify(hubName: string, action: string, times: number, callback?: (invokes: IServerInvoke[]) => void): Chainable<Subject>;
            hubPrintData(): Chainable<Subject>;
        }
    }
}
