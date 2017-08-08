import {Module} from "../Interfaces/Module";
import {Emulator} from "../index";

export abstract class Component implements Module {

    name: string;

    constructor() {
        this.name = this.constructor.name;
    }

    init(emu: Emulator) {

    }

}