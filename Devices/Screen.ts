import {Device} from "../Abstractions/Device";

export class Screen extends Device {

    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.canvas = canvas;
    }

}