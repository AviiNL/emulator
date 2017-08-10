import {Module} from "../Interfaces/Module";
import {Modular} from "./Modular";

export abstract class Component implements Module {

    name: string;

    constructor() {
        this.name = this.constructor.name;
    }

    init(parent: Modular) {

    }

}