import Log from "../log";
import { Subject } from "rxjs";
import IPayload from "./IPayload";
import { IHubConnectionData } from "./IHubConnectionData";
import IServerInvoke from "./IServerInvoke";
import { IStreamResult, Subject as SignalrSubject } from "@microsoft/signalr";

/**
 * Mock implementation of HubConnection,
 * Based on "@microsoft/signalr": "7.0.5" - "@microsoft/signalr/src/HubConnection.ts",
 */
export default class HubConnectionMock {
  private _hubConnectionData: IHubConnectionData[] = [];
  private _serverInvokes: IServerInvoke[] = [];
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public publish(action: string, value: any): void {
    const channels = this._hubConnectionData.filter((x) => x.action === action);
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
    methodName = methodName.toLowerCase();

    // Create if it doesn't exist yet
    if (!this._hubConnectionData.some((x) => x.action === methodName)) {
      this._hubConnectionData.push({
        action: methodName,
        isStream: false,
        channel: new Subject<any>(),
        subscriptions: [],
      });
    }

    // Find the connection data
    let connectionData = this._hubConnectionData.find(
      (x) => x.action === methodName
    );

    if (!connectionData) {
      throw new Error(`Could not find connection data for ${methodName}`);
    }

    // Subscribe to the channel
    let subscription = connectionData.channel.subscribe((payload: IPayload) => {
      newMethod(payload.value);
    });

    connectionData.subscriptions.push({
      handler: newMethod,
      subscription,
    });
  }

  /** Invokes a streaming hub method on the server using the specified name and arguments.
   *
   * @typeparam T The type of the items returned by the server.
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {IStreamResult<T>} An object that yields results from the server as they are received.
   */
  public stream<T = any>(methodName: string, ...args: any[]): IStreamResult<T> {
    methodName = methodName.toLowerCase();

    // Create if it doesn't exist yet
    if (!this._hubConnectionData.some((x) => x.action === methodName)) {
      this._hubConnectionData.push({
        action: methodName,
        isStream: true,
        channel: new Subject<T>(),
        subscriptions: [],
      });
    }

    // Find the connection data
    let connectionData = this._hubConnectionData.find(
      (x) => x.action === methodName
    );

    if (!connectionData) {
      throw new Error(`Could not find connection data for ${methodName}`);
    }

    const signalrSubject = new SignalrSubject<T>();

    // SignalR has a custom subject
    connectionData.channel.subscribe({
      next: (x) => signalrSubject.next(x),
      error: (err) => signalrSubject.error(err),
      complete: () => signalrSubject.complete(),
    });

    return signalrSubject;
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

  /** Removes all handlers for the specified hub method.
   *
   * @param {string} methodName The name of the method to remove handlers for.
   */
  public off(methodName: string): void;
  /** Removes the specified handler for the specified hub method.
   *
   * You must pass the exact same Function instance as was previously passed to {@link @microsoft/signalr.HubConnection.on}. Passing a different instance (even if the function
   * body is the same) will not remove the handler.
   *
   * @param {string} methodName The name of the method to remove handlers for.
   * @param {Function} method The handler to remove. This must be the same Function instance as the one passed to {@link @microsoft/signalr.HubConnection.on}.
   */
  public off(methodName: string, method: (...args: any[]) => void): void;
  public off(methodName: string, method?: (...args: any[]) => void): void {
    methodName = methodName.toLowerCase();

    const index = this._hubConnectionData.findIndex(
      (x) => x.action === methodName
    );
    if (index == -1) {
      Log.warn(`No channels registered for action name: ${methodName}`);
      return;
    }

    if (method) {
      const handlerIndex = this._hubConnectionData[
        index
      ].subscriptions.findIndex((x) => x.handler === method);

      if (handlerIndex == -1) {
        Log.warn(
          `Could not find the handler to delete for action name: ${methodName}`
        );
        return;
      }

      this._hubConnectionData[index].subscriptions.splice(handlerIndex, 1);

      if (this._hubConnectionData[index].subscriptions.length === 0) {
        this._hubConnectionData.splice(index, 1);
      }
    } else {
      this._hubConnectionData.splice(index, 1);
    }
  }

  /** Registers a handler that will be invoked when the connection is closed.
   *
   * @param {Function} callback The handler that will be invoked when the connection is closed. Optionally receives a single argument containing the error that caused the connection to close (if any).
   */
  public onclose(callback: (error?: Error) => void): void {
    return;
  }

  /** Starts the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully established, or rejects with an error.
   */
  public start(): Promise<void> {
    return Promise.resolve();
  }

  /** Stops the connection.
   *
   * @returns {Promise<void>} A Promise that resolves when the connection has been successfully terminated, or rejects with an error.
   */
  public async stop(): Promise<void> {
    return Promise.resolve();
  }

  /** Registers a handler that will be invoked when the connection starts reconnecting.
   *
   * @param {Function} callback The handler that will be invoked when the connection starts reconnecting. Optionally receives a single argument containing the error that caused the connection to start reconnecting (if any).
   */
  public onreconnecting(callback: (error?: Error) => void): void {
    return;
  }

  /** Registers a handler that will be invoked when the connection successfully reconnects.
   *
   * @param {Function} callback The handler that will be invoked when the connection successfully reconnects.
   */
  public onreconnected(callback: (connectionId?: string) => void): void {
    return;
  }

  /** Invokes a hub method on the server using the specified name and arguments. Does not wait for a response from the receiver.
   *
   * The Promise returned by this method resolves when the client has sent the invocation to the server. The server may still
   * be processing the invocation.
   *
   * @param {string} methodName The name of the server method to invoke.
   * @param {any[]} args The arguments used to invoke the server method.
   * @returns {Promise<void>} A Promise that resolves when the invocation has been successfully sent, or rejects with an error.
   */
  public send(methodName: string, ...args: any[]): Promise<void> {
    return Promise.resolve();
  }

  // endregion
}
