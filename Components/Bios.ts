import {Component} from "../Abstractions/Component";
import {Modular} from "../Abstractions/Modular";
import {Emulator} from "../index";
import * as fs from "fs";
import {serialize, Serializer} from "../Helpers/Serializer";

export class Bios extends Component {

    emulator: Emulator;

    @serialize()
    buffer: ArrayBuffer;

    constructor(filePath: string) {
        super();
        if(!fs.existsSync(filePath)) {
            throw new Error(`Bios file ${filePath} not found`);
        }

        this.buffer = fs.readFileSync(filePath).buffer;
    }

    init(parent: Modular) {
        this.emulator = parent as Emulator;
    }

    getState(): any {
        return Serializer.serialize(this);
    }

    setState(state: any): any {
        Serializer.deserialize(this, state);
    }
}