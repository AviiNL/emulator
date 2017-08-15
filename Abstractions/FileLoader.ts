import {Device} from "./Device";
import {Modular} from "./Modular";
import {Emulator} from "../index";
import * as fs from "fs";
import {serialize} from "../Helpers/Serializer";
import * as path from "path";

export class FileLoader extends Device {

    emulator: Emulator;

    @serialize() buffer: ArrayBuffer;
    @serialize() filePath: string;

    constructor(filePath: string) {
        super();
        if (!fs.existsSync(filePath)) {
            throw new Error(`Storage file ${filePath} not found`);
        }

        this.filePath = filePath;
    }

    init(parent: Modular) {
        this.emulator = parent as Emulator;

        console.log(`Loading ${this.name} "${path.basename(this.filePath)}"`);

        this.buffer = new Uint8Array(fs.readFileSync(this.filePath)).buffer;
    }
}
