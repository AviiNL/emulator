import {Module} from "../Interfaces/Module";
import {Modular} from "./Modular";
import {Emulator} from "../index";
import {serialize, Serializer} from "../Helpers/Serializer";

export abstract class ModularComponent extends Modular implements Module {

    @serialize()
    name: string;

    constructor(allow_duplicated_modules: boolean = true) {
        super(allow_duplicated_modules);
        this.name = this.constructor.name;
    }

    init(emu: Emulator) {

    }

    getState() {
        return Serializer.serialize(this);
    }

    setState(state: any) {
        Serializer.deserialize(this, state);
    }

}