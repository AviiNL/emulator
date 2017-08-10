import {Util} from "./Util";

export function o(opcode: number) {
    return new Opcode(opcode);
}

export class Opcode {

    number: number;
    prefix: number;
    opcode: number;

    constructor(opcode: number) {
        if (opcode < 0 || opcode > 65535) {
            throw new Error('Out of range');
        }

        let hex = Util.hex(opcode, 4).substr(2);
        let buffer = Buffer.from(hex, 'hex');

        this.prefix = buffer[0];
        this.opcode = buffer[1];

        this.number = (this.prefix << 8) | this.opcode;
    }

    toString() {
        return Util.hex(this.number, 4);
    }
}