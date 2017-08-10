import {Modular} from "./Abstractions/Modular";
import {Bus} from "./Components/Bus";

export class Emulator extends Modular {

    constructor() {
        super(true);
    }


    powerOn() {
        console.log(`Emulator starting...`);

        this.loadDefaultModules();

        // Initialize all added modules
        this.initModules();
    }

    loadDefaultModules() {
        if (!this.modules.hasOwnProperty('bus')) {
            this.addModule(new Bus());
        }
    }

    powerOff() {

    }
}
