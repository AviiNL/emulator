import {x86CPU} from "..//x86CPU";
import {Component} from "../../Abstractions/Component";
import {Modular} from "../../Abstractions/Modular";
import {o, Opcode} from "../../Helpers/Opcode";

interface x86Instruction {
    (cpu: x86CPU): void
}

enum Table {
    both,
    x16,
    x32,
}

/**
 * Instruction Set Architecture
 */
export class ISA extends Component {

    cpu: x86CPU;

    table16: { [opcode: number]: x86Instruction };
    table32: { [opcode: number]: x86Instruction };

    init(parent: Modular) {
        console.log("Loading x86 Instruction Set Architecture");

        this.cpu = parent as x86CPU;
    }

    exec(opcode: Opcode, table: Table) {
        let localTable;
        if(table === Table.x32) {
            localTable = this.table32;
        } else {
            localTable = this.table16;
        }

        if(!localTable.hasOwnProperty(opcode.number)) {
            throw new Error(`Opcode ${opcode.toString()} not implemented`);
        }

        localTable[opcode.number](this.cpu);
    }

    add(table: Table, opcode: Opcode, fn: x86Instruction) {
        if(table === Table.both || table === Table.x16) {
            this.table16[opcode.number] = fn;
        }

        if(table === Table.both || table === Table.x32) {
            this.table32[opcode.number] = fn;
        }
    }
}
