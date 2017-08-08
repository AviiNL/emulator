import {Modular} from "../Devices/Modular";

export interface Module {
    name:string;
    init(parent: Modular): void;
}