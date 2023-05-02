import debug from "debug";

export default class Log {
  public static debug(message: string) {
    debug("cypress-signalr-mock")(message);
  }

  public static info(message: string) {
    console.info(message);
  }

  public static warn(message: string) {
    console.warn(message);
  }

  public static error(message: string) {
    console.error(message);
  }
}
