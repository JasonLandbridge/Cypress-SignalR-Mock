export default class Log {
  private static _prefix: string = "[Cypress-SignalR-Mock] - ";
  private static _logLevel: number = 3;

  public static debug(message: string) {
    if (this._logLevel >= 4) {
      console.debug(this._prefix + message);
    }
  }

  public static info(message: string, value?: any) {
    if (this._logLevel >= 3) {
      if (value !== undefined) {
        console.info(this._prefix + message, value);
      } else {
        console.info(this._prefix + message);
      }
    }
  }

  public static warn(message: string) {
    if (this._logLevel >= 1) {
      console.warn(this._prefix + message);
    }
  }

  public static error(message: string, throwError: boolean = true) {
    if (this._logLevel >= 0) {
      if (throwError) {
        throw new Error(this._prefix + message);
      } else {
        console.error(this._prefix + message);
      }
    }
  }

  static setLogLevel(logLevel: number): void {
    this._logLevel = logLevel;
  }
}
