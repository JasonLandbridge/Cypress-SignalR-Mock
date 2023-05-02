import { Subject } from "rxjs";
import HubConnectionMock from "./types/HubConnectionMock";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import IMockData from "./types/IMockData";

export function registerSubscriber(
  subject: Subject<any>,
  callback: (payload: any) => void
) {
  subject.subscribe(callback);
}

export function setupData() {
  if (window["cypress-signalr-mock"] === undefined) {
    window["cypress-signalr-mock"] = {
      mocks: [],
    };
  }
}

export function getData(): IMockData {
  setupData();
  return window["cypress-signalr-mock"];
}

export function getHubConnectionMock(
  hubName: string
): HubConnectionMock | null {
  return getData().mocks.find((x) => x.name === hubName) || null;
}
