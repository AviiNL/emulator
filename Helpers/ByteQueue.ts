import {dbg_assert} from "../Global/Log";

export class ByteQueue {

    private size: number;
    private data: Uint8Array;

    private start: number = 0;
    private end: number = 0;

    length: number;

    constructor(size: number) {
        this.size = size;
        this.data = new Uint8Array(this.size);

        dbg_assert((this.size & this.size - 1) === 0);

        this.length = 0;
    }

    push(item: any) {
        if (this.length === this.size) {
            // intentional overwrite
        } else {
            this.length++;
        }

        this.data[this.end] = item;
        this.end = this.end + 1 & this.size - 1;
    }

    shift() {
        if (!this.length) {
            return -1;
        } else {
            let item = this.data[this.start];

            this.start = this.start + 1 & this.size - 1;
            this.length--;

            return item;
        }
    }

    peek() {
        if (!this.length) {
            return -1;
        } else {
            return this.data[this.start];
        }
    }

    clear() {
        this.start = 0;
        this.end = 0;
        this.length = 0;
    }

}