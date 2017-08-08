///<reference path="../node_modules/@types/node/index.d.ts"/>

export class Performance {
    static now() {
        let t = process.hrtime();
        return t[0] * 1000 + t[1] / 1e6;
    }
}
