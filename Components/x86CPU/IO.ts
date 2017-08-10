// Input/Output
import {Component} from "../../Abstractions/Component";
import {Modular} from "../../Abstractions/Modular";

export class IO extends Component {

    init(cpu: Modular) {

    }

    register_write(port_addr: number, device: Component, w8: (data: any) => void, w16?: (data: any) => void, w32?: (data: any) => void) {
        throw new Error("Not yet implemented");
    }

    register_read(port_addr: number, device: Component, r8: () => void, r16?: () => void, r32?: () => void) {
        throw new Error("Not yet implemented");
    }
}