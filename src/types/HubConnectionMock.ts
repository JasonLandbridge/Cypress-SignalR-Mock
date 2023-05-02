import { Subject, Subscription } from "rxjs";
import IPayload from "./IPayload";
import { IMessageHub } from "./IMessageHub";
import Log from "../log/log";

export default class HubConnectionMock {
  private _subscriptions: Subscription[] = [];
  private _channels: IMessageHub[] = [];
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public publish(action: string, value: any): void {
    const channels = this._channels.filter((x) => x.action === action);
    if (channels.length === 0) {
      Log.warn(`No subscribers for ${action}`);
      return;
    }
    channels.forEach((x) => {
      x.channel.next({ name: action, value });
    });
  }

  // region Native SignalR methods

  /** Registers a handler that will be invoked when the hub method with the specified method name is invoked.
   *
   * @param {string} methodName The name of the hub method to define.
   * @param {Function} newMethod The handler that will be raised when the hub method is invoked.
   */
  public on(methodName: string, newMethod: (...args: any[]) => any): void;
  public on(methodName: string, newMethod: (...args: any[]) => void): void {
    // Create if it doesn't exist yet
    if (!this._channels.some((x) => x.action === methodName)) {
      this._channels.push({ action: methodName, channel: new Subject<any>() });
    }
    // Subscribe to the channel
    let index = this._channels.find((x) => x.action === methodName);
    let subscription = index?.channel.subscribe((payload: IPayload) => {
      newMethod(payload.value);
    });

    if (subscription) {
      this._subscriptions.push(subscription);
    }
  }

  // endregion

  public invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
    return new Promise<T>((resolve) => {
      //addInvoke({ action, args });
      resolve(void 0);
    });
  }

  off(action: string, callback: (args: any[]) => void): void {
    // removeSubscriber(action, callback);
  }

  onclose(callback?: (error?: Error) => void): void {
    return;
  }

  start(): Promise<void> {
    return Promise.resolve();
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }

  onreconnecting(callback?: (error?: Error) => void): void {
    return;
  }

  onreconnected(callback?: (connectionId?: string) => void): void {
    return;
  }

  send(methodName: string, args: any[]): Promise<void> {
    return Promise.resolve();
  }
}
