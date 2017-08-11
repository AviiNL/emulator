import {Modular} from "./Abstractions/Modular";
import {Bus} from "./Components/Bus";

export class Emulator extends Modular {

    power: boolean;
    paused: boolean;
    initialized: boolean;

    constructor() {
        super(true);
        this.power = false;
        this.paused = false;
        this.initialized = false;
    }


    powerOn() {
        this.power = true;
        this.paused = false;
        console.log(`Emulator starting...`);

        this.loadDefaultModules();

        // Initialize all added modules
        if(!this.initialized) {
            this.initModules();
            this.initialized = true;
        }
    }

    loadDefaultModules() {
        if (!this.modules.hasOwnProperty('bus')) {
            this.addModule(new Bus());
        }
    }

    powerOff() {


        this.power = false;
    }


    saveState() {
        this.paused = true;
        let state:any = {};

        for(let i in this.modules) {
            for(let module of this.modules[i]) {
                if(!state.hasOwnProperty(i)) {
                    state[module.constructor.name] = [];
                }
                state[module.constructor.name].push(module.getState());
            }
        }

        this.paused = false;
        return JSON.stringify(state);
    }

    loadState(state: any) {
        this.paused = true;
        state = JSON.parse(state);

        // Make sure all default modules are there
        this.loadDefaultModules();

        // initialize the modules so they have the correct default-state
        if(!this.initialized) {
            this.initModules();
            this.initialized = true;
        }

        // Load all state info into the corresponding module
        for(let name in this.modules) {
            for(let module of this.modules[name]) {
                if(!state.hasOwnProperty(module.constructor.name)) continue;

                module.setState(state[module.constructor.name].shift());
            }
        }

        this.paused = false;
    }
}
