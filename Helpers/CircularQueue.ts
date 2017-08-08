export class CircularQueue {

    data: Array<any> = [];
    index: number = 0;
    size: number;

    constructor(size: number) {
        this.size = size;
    }

    add(item: any) {
        this.data[this.index] = item;
        this.index = (this.index + 1) % this.size;
    }

    set(data: Array<any>) {
        this.data = data;
        this.index = 0;
    }

    clear() {
        this.data = [];
        this.index = 0;
    }

    toArray() {
        return [].slice.call(this.data, this.index).concat([].slice.call(this.data, 0, this.index));
    }
}