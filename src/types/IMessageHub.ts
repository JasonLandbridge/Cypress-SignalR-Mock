import { Subject } from "rxjs";

export interface IMessageHub {
  action: string;
  channel: Subject<any>;
}
