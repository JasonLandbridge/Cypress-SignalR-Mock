import debug from "debug";

export default class Log {
  private static _prefix: string = "[Cypress-SignalR-Mock] - ";

  public static debug(message: string) {
    debug("cypress-signalr-mock")(message);
  }

  public static info(message: string) {
    console.info(this._prefix + message);
  }

  public static warn(message: string) {
    console.warn(this._prefix + message);
  }

  public static error(message: string, throwError: boolean = true) {
    if (throwError) {
      throw new Error(this._prefix + message);
    } else {
      console.error(this._prefix + message);
    }
  }
}
