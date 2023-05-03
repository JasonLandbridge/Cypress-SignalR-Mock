import { Subject } from "rxjs";
import HubConnectionMock from "./types/HubConnectionMock";
import IMockData from "./types/IMockData";

export function registerSubscriber(
  subject: Subject<any>,
  callback: (payload: any) => void
) {
  subject.subscribe(callback);
}

export function getData(): IMockData {
  return window["cypress-signalr-mock"];
}

export function getHubConnectionMock(
  hubName: string
): HubConnectionMock | null {
  return getData().mocks.find((x) => x.name === hubName) || null;
}
