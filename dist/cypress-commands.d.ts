import IServerInvoke from "./types/IServerInvoke";
export declare function setupCypressCommands(): void;
export declare function hubPublish(hubName: string, action: string, payload: any): void;
export declare function hubVerify(hubName: string, action: string, times?: number, callback?: (invokes: IServerInvoke[]) => void): void;
export declare function hubPrintData(): void;
