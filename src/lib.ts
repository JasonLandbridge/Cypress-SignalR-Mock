import { Subject } from "rxjs";
import HubConnectionMock from "./types/HubConnectionMock";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

export function registerSubscriber(
  subject: Subject<any>,
  callback: (payload: any) => void
) {
  subject.subscribe(callback);
}

export function createCypressSignalrMock(
  name: string,
  config: {
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

export function setupData() {
  if (window["cypress-signalr-mock"] === undefined) {
    window["cypress-signalr-mock"] = {
      mocks: [],
    };
  }
}

export function getData() {
  setupData();
  return window["cypress-signalr-mock"];
}

export function getHubConnectionMock(
  hubName: string
): HubConnectionMock | null {
  return getData().mocks.find((x) => x.name === hubName) || null;
}
