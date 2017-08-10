import {dbg_assert} from "../Global/Log";

export class BusConnector {

    pair: BusConnector;
    listeners: { [name: string]: Array<{ fn: any, thisArg: any }> };

    register(name: string, fn: (value: any) => void, registerer: any) {
        let listeners = this.listeners[name];

        if (listeners === undefined) {
            listeners = this.listeners[name] = [];
        }

        listeners.push({
            fn: fn,
            thisArg: registerer,
        });
    }

    unregister(name: string, fn: (value: any) => void) {
        let listeners = this.listeners[name];

        if (listeners === undefined) {
            return;
        }

        this.listeners[name] = listeners.filter(function (l) {
            return l.fn !== fn
        });
    }

    send(name: string, value: any) {
        if (!this.pair) {
            return;
        }

        let listeners = this.pair.listeners[name];

        if (typeof listeners === 'undefined') {
            return;
        }

        for (let listener of listeners) {
            listener.fn.call(listener.thisArg, value);
        }
    }

    send_async(name: string, value: any) {
        dbg_assert(arguments.length === 1 || arguments.length === 2);

        setTimeout(this.send.bind(this, name, value), 0);
    }

}