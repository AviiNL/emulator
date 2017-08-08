import {Module} from "../Interfaces/Module";

export abstract class Modular {

    private allow_duplicated_modules: boolean;

    public readonly modules: {[key: string]: Module[]} = {};

    constructor(allow_duplicated_modules: boolean = true) {
        this.allow_duplicated_modules = allow_duplicated_modules;
    }

    public addModule(module: Module) {
        let moduleName = module.name;

        if (!this.allow_duplicated_modules) {
            if (this.modules.hasOwnProperty(moduleName.toLowerCase())) {
                throw new Error(`Module ${moduleName} already installed`);
            }
        }

        if (!this.modules.hasOwnProperty(moduleName.toLowerCase())) {
            this.modules[moduleName.toLowerCase()] = [];
        }

        this.modules[moduleName.toLowerCase()].push(module);
    }
}
