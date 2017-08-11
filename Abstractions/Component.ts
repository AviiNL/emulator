import {Module} from "../Interfaces/Module";
import {Modular} from "./Modular";
import {serialize, Serializer} from "../Helpers/Serializer";

export abstract class Component implements Module {

    @serialize()
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