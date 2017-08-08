import {Modular} from "./Devices/Modular";

export class Emulator extends Modular {

    constructor() {
        super(true);
    }

    powerOn() {
        // Initialize all added modules
        for (let i in this.modules) {
            if (!this.modules.hasOwnProperty(i)) continue;

            this.modules[i].forEach((m) => {

                if (typeof m.init !== 'function') {
                    throw new Error('init(emulator) not defined');
                }

                m.init(this);
            });
        }
    }

    powerOff() {

    }
}
