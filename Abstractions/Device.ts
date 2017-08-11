import {Module} from "../Interfaces/Module";
import {Emulator} from "../index";
import {Serializer} from "../Helpers/Serializer";

export abstract class Device implements Module {

    name:string;

    constructor() {
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