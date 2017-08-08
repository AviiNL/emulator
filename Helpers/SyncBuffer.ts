import {dbg_assert} from "../Global/Log";

export interface EmptyCallback {
    (): void;
}

export interface UInt8ArrayCallback {
    (data: Uint8Array): void;
}

export interface ArrayBufferCallback {
    (data: ArrayBuffer): void;
}

export class SyncBuffer {

    buffer: ArrayBuffer;
    byteLength: number;
    onload: any;
    onprogress: any;

    constructor(buffer: ArrayBuffer) {
        this.buffer = buffer;
        this.byteLength = buffer.byteLength;
        this.onload = undefined;
        this.onprogress = undefined;
    }

    load() {
        this.onload && this.onload({buffer: this.buffer});
    }

    get (start: number, len: number, fn: UInt8ArrayCallback) {
        dbg_assert(start + len <= this.byteLength);
        fn(new Uint8Array(this.buffer, start, len));
    }

    set (start: number, slice: Uint8Array, fn: EmptyCallback) {
        dbg_assert(start + slice.byteLength <= this.byteLength);

        new Uint8Array(this.buffer, start, slice.byteLength).set(slice);
        fn();
    }

    get_buffer(fn: ArrayBufferCallback) {
        fn(this.buffer);
    }

}