import {CPU} from "../Abstractions/CPU";
import {Modular} from "../Abstractions/Modular";
import {ISA} from "./x86CPU/ISA";
import {Bus} from "./Bus";
import {BusConnector} from "./BusConnector";
import {serialize} from "../Helpers/Serializer";

export class x86CPU extends CPU {

    emulator: Modular;
    bus: BusConnector;

    @serialize()
    load_default_modules: boolean;

    constructor(load_default_modules: boolean = true) {
        super();
        this.load_default_modules = load_default_modules;
        this.a20_enabled = true;

    }

    init(parent: Modular) {
        this.emulator = parent;

        this.bus = (this.emulator.getModules('bus').first() as Bus).emulator_bus;

        if (this.load_default_modules) {
            this.loadDefaultModules();
        }

        this.initModules();
    }

    loadDefaultModules() {

        this.addModule(new ISA());

        // this.addModule(new RTC());
        // this.addModule(new RTC());
        // this.addModule(new RTC());

    }

}