import {Module} from "../Interfaces/Module";
import {List} from "../Helpers/List";
import {serialize} from "../Helpers/Serializer";

export abstract class Modular {

    @serialize()
    private allow_duplicated_modules: boolean;

    public readonly modules: { [key: string]: List<Module> } = {};

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
            this.modules[moduleName.toLowerCase()] = new List<Module>();
        }

        this.modules[moduleName.toLowerCase()].push(module);
    }

    public getModules(name: string): List<Module> {
        name = name.toLowerCase();

        if (!this.modules.hasOwnProperty(name)) {
            console.warn(`Module ${name} not found on ${this.constructor.name}`);
            return new List<Module>();
        }

        return this.modules[name];
    }

    getModule(name:string) : Module {
        if(this.allow_duplicated_modules) {
            throw new Error('Duplicate modules is enabled, use `getModules(name: string): List<Module>` instead');
        }

        return this.getModules(name).first();

    }

    // @todo[wait]: T is not accessible within the method
    // getModules<T>(): T[] | null {
    //     for (let i in this.modules) {
    //         if (this.modules[i].first() instanceof T) {
    //             return this.modules[i];
    //         }
    //     }
    //
    //     return null;
    // }
    //
    // usage: this.geModule<Bus>()

    public initModules() {
        for (let i in this.modules) {
            if (!this.modules.hasOwnProperty(i)) continue;

            for (let module of this.modules[i]) {
                if (typeof module.init !== 'function') {
                    throw new Error(`init(parent: Modular) not defined on ${module.name}`);
                }

                module.init(this);
            }
        }
    }
}
