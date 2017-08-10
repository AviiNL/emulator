import {ModularComponent} from "./ModularComponent";

export abstract class CPU extends ModularComponent {
    a20_enabled: boolean;

    constructor() {
        super(false);
        this.name = 'cpu';
    }

}