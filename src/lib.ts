import { Subject } from "rxjs";
import HubConnectionMock from "./types/HubConnectionMock";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export function registerSubscriber(
  subject: Subject<any>,
  callback: (payload: any) => void
) {
  subject.subscribe(callback);
}

export function createCypressSignalrMock(): HubConnection | null {
  // @ts-ignore
  if (window.Cypress) {
    const mock = new HubConnectionMock();
    if (window["cypress-signalr-mock"] === undefined) {
      window["cypress-signalr-mock"] = {
        mocks: [],
      };
    }
    window["cypress-signalr-mock"].mocks.push(mock);
    // @ts-ignore
    return <HubConnection>mock;
  }
  return null;
}
