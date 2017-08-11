import {Module} from "../Interfaces/Module";
import {Modular} from "./Modular";
import {Serializer} from "../Helpers/Serializer";

export abstract class Component implements Module {

    name: string;

    constructor() {
        this.name = this.constructor.name;
    }

    init(parent: Modular) {

    }

    getState() {
        return Serializer.serialize(this);
    }

    setState(state: any) {
        Serializer.deserialize(this, state);
    }

}