import { Subject, Subscription } from "rxjs";
import IPayload from "./IPayload";
import { IMessageHub } from "./IMessageHub";
import Log from "../log";
import IServerInvoke from "./IServerInvoke";

export default class HubConnectionMock {
  private _subscriptions: Subscription[] = [];
  private _channels: IMessageHub[] = [];
  private _serverInvokes: IServerInvoke[] = [];
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
    Log.debug(`Publishing action: ${action} to ${channels.length} subscribers`);
    channels.forEach((x) => {
      x.channel.next({ name: action, value });
    });
  }

  public verify(
    action: string,
    times: number = 1,
    callback?: (invokes: IServerInvoke[]) => void
  ) {
    const currentInvokes = this._serverInvokes.filter(
      (s) => s.action === action
    );

    expect(currentInvokes.length).to.equal(times, `${action} not invoked`);

    if (callback) {
      callback(currentInvokes);
    }
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

  /** Invokes a hub method on the server using the specified name and arguments.
   *
   * The Promise returned by this method resolves when the server indicates it has finished invoking the method. When the promise
   * resolves, the server has finished invoking the method. If the server method returns a result, it is produced as the result of
   * resolving the Promise.
   *
   * @typeparam T The expected return type.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<T>} A Promise that resolves with the result of the server method (if any), or rejects with an error.
   */
  invoke<T = any>(methodName: string, ...args: any[]): Promise<T> {
    return new Promise<T>((resolve) => {
      this._serverInvokes.push({
        action: methodName,
        args,
      });
      resolve(0 as any);
    });
  }

  // endregion

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
