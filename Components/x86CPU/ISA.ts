// Instruction Set Architecture
// (holds all opcode executions)

import {x86CPU} from "..//x86CPU";
import {Component} from "../../Abstractions/Component";
import {Modular} from "../../Abstractions/Modular";

export class ISA extends Component {

    instructionTable8: { [opcode: number]: (cpu: x86CPU) => void };
    instructionTable16: { [opcode: number]: (cpu: x86CPU) => void };
    instructionTable32: { [opcode: number]: (cpu: x86CPU) => void };

    init(parent: Modular) {

        this.instructionTable8[0x00] = (cpu: x86CPU) => {
            // cpu.read_modrm_byte(); //etc
        };

    }

}