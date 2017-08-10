import {Modular} from "../Abstractions/Modular";

export interface Module {
    name:string;
    init(parent: Modular): void;
}