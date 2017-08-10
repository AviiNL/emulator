import {BusConnector} from "./BusConnector";
import {Component} from "../Abstractions/Component";
import {Modular} from "../Abstractions/Modular";

export class Bus extends Component {

    readonly adapter_bus: BusConnector;
    readonly emulator_bus: BusConnector;

    constructor() {
        super();

        this.adapter_bus = new BusConnector();
        this.emulator_bus = new BusConnector();

        this.adapter_bus.pair = this.emulator_bus;
        this.emulator_bus.pair = this.adapter_bus;
    }

    init(parent: Modular) {
        console.log(`Initializing Bus`);
    }

}