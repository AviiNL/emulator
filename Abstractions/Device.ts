import {Module} from "../Interfaces/Module";
import {Emulator} from "../index";
import {serialize, Serializer} from "../Helpers/Serializer";

export abstract class Device implements Module {

    @serialize()
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