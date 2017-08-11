import {ModularComponent} from "./ModularComponent";
import {serialize} from "../Helpers/Serializer";

export abstract class CPU extends ModularComponent {

    @serialize()
    a20_enabled: boolean;

    constructor() {
        super(false);
        this.name = 'cpu';
    }

}