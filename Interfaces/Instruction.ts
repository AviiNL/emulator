import {CPU} from "../Abstractions/CPU";

export interface Instruction {
    exec(cpu: CPU): void;
}