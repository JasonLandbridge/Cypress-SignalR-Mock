import IServerInvoke from "./types/IServerInvoke";
export declare function setupCypressCommands(): void;
export declare function hubPublish(hubName: string, messageType: string, payload: any): void;
export declare function hubVerify(hubName: string, messageType: string, callback?: (invokes: IServerInvoke[]) => void): void;
export declare function hubPrintData(): void;
export declare function hubClear(): void;
