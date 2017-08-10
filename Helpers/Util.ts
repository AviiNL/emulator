import {dbg_assert} from "../Global/Log";

let int_log2_table = new Int8Array(256);

for (let i = 0, b = -2; i < 256; i++) {
    if (!(i & i - 1))
        b++;
    int_log2_table[i] = b;
}

export class Util {
    static pads(str: any, len: number) {
        str = str ? str + "" : "";

        while (str.length < len) {
            str = str + " ";
        }

        return str;
    }

    static pad0(str: any, len: number) {
        return (("0".repeat(len) + (str)).substr(-Math.abs(len)));
    }

    static hex(n: number, len: number = 1) {
        return "0x" + Util.pad0(n.toString(16).toUpperCase(), len);
    }

    static has_rand_int() {
        return false;
    }

    static get_rand_int() {
        console.assert(false);
    }

    int_log2_byte(x: number) {
        dbg_assert(x > 0);
        dbg_assert(x < 0x100);

        return int_log2_table[x];
    }

    int_log2(x: number) {
        dbg_assert(x > 0);

        // http://jsperf.com/integer-log2/6
        let tt = x >>> 16;
        let t;

        if (tt) {
            t = tt >>> 8;
            if (t) {
                return 24 + int_log2_table[t];
            } else {
                return 16 + int_log2_table[tt];
            }
        } else {
            t = x >>> 8;
            if (t) {
                return 8 + int_log2_table[t];
            } else {
                return int_log2_table[x];
            }
        }
    }
}