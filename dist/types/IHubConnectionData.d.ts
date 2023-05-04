import { Subject, Subscription } from "rxjs";
export interface IHubConnectionData {
    /**
     * The name of the SignalR action to subscribe to.
     */
    messageType: string;
    /**
     * The subject to publish to when the hub connection has received a message.
     */
    channel: Subject<any>;
    isStream: boolean;
    /**
     * Current subscriptions to the channel.
     */
    subscriptions: {
        /**
         * The handler to invoke when the hub connection has received a message.
         * This is also used to uniquely identify the subscription.
         * @param args
         */
        handler: (...args: any[]) => void;
        /**
         * The subscription to the channel for this specific handler.
         * Can be called to dispose of the subscription.
         */
        subscription: Subscription;
    }[];
}
