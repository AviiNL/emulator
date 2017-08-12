import {Device} from "./Device";
import {Modular} from "./Modular";
import {Emulator} from "../index";
import * as fs from "fs";
import {serialize} from "../Helpers/Serializer";

export class StorageDevice extends Device {

    emulator: Emulator;

    @serialize()
    buffer: ArrayBuffer;

    constructor(filePath: string) {
        super();
        if(!fs.existsSync(filePath)) {
            throw new Error(`Storage file ${filePath} not found`);
        }

        this.buffer = new Uint8Array(fs.readFileSync(filePath)).buffer;
    }

    init(parent: Modular) {
        this.emulator = parent as Emulator;
    }
}
