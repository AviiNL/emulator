import {CPU} from "../Abstractions/CPU";
import {Modular} from "../Abstractions/Modular";

export class x86CPU extends CPU {

    emulator: Modular;
    load_default_modules: boolean;

    constructor(load_default_modules: boolean = true) {
        super();
        this.load_default_modules = load_default_modules;
        this.a20_enabled = true;
    }

    init(parent: Modular) {
        this.emulator = parent;
        console.log(`Initializing x86 CPU`);

        if (this.load_default_modules) {
            this.loadDefaultModules();
        }
    }

    loadDefaultModules() {

        // this.addModule(new RTC());
        // this.addModule(new RTC());
        // this.addModule(new RTC());

    }

}