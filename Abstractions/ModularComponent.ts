import {Module} from "../Interfaces/Module";
import {Modular} from "./Modular";
import {Emulator} from "../index";

export abstract class ModularComponent extends Modular implements Module {

    name:string;

    constructor(allow_duplicated_modules:boolean = true) {
        super(allow_duplicated_modules);
        this.name = this.constructor.name;
    }

    init(emu: Emulator) {

    }

}