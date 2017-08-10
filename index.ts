import {Modular} from "./Abstractions/Modular";

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
                    throw new Error('init(parent: Modular) not defined');
                }

                m.init(this);
            });
        }
    }

    powerOff() {

    }
}
