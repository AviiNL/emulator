import {DEBUG, LOG_LEVEL, LOG_TO_FILE} from "./Config";
import {LOG_NAMES} from "./Constants";
import {Util} from "../Helpers/Util";

declare const log_data: any;

export function do_the_log(message: string) {
    if (LOG_TO_FILE) {
        log_data.push(message, "\n");
    } else {
        console.log(message);
    }
}

export function dbg_assert(cond: boolean, msg: string = ''/*, level*/) {
    if (!DEBUG) return;

    if (!cond) {
        dbg_assert_failed(msg);
    }
}

export function dbg_assert_failed(msg: string) {
    console.trace();

    if (msg) {
        throw "Assert failed: " + msg;
    } else {
        throw "Assert failed";
    }
}

export const dbg_log = (function () {
    if (!DEBUG) {
        return function () {
        };
    }

    /** @const @type {Object.<number, string>} */
    const dbg_names = LOG_NAMES.reduce(function (a: any, x: any) {
        a[x[0]] = x[1];
        return a;
    }, {});

    let log_last_message = "";
    let log_message_repetitions = 0;

    function dbg_log_(stuff: any, level: number) {
        if (!DEBUG) return;

        level = level || 1;

        if (level & LOG_LEVEL) {
            const level_name = dbg_names[level] || "",
                message = "[" + Util.pads(level_name, 4) + "] " + stuff;

            if (message === log_last_message) {
                log_message_repetitions++;

                if (log_message_repetitions < 2048) {
                    return;
                }
            }

            const now = new Date();
            const time_str = Util.pad0(now.getHours(), 2) + ":" +
                Util.pad0(now.getMinutes(), 2) + ":" +
                Util.pad0(now.getSeconds(), 2) + "+" +
                Util.pad0(now.getMilliseconds(), 3) + " ";

            if (log_message_repetitions) {
                if (log_message_repetitions === 1) {
                    do_the_log(time_str + log_last_message);
                }
                else {
                    do_the_log("Previous message repeated " + log_message_repetitions + " times");
                }

                log_message_repetitions = 0;
            }

            do_the_log(time_str + message);
            log_last_message = message;
        }
    }

    return dbg_log_;
})();