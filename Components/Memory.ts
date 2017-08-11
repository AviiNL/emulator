import {Modular} from "../Abstractions/Modular";
import {MMAP_BLOCK_BITS, MMAP_BLOCK_SIZE} from "../Global/Constants";
import {dbg_assert} from "../Global/Log";
import {DEBUG} from "../Global/Config";
import {CPU} from "../Abstractions/CPU";
import {Component} from "../Abstractions/Component";
import {serialize} from "../Helpers/Serializer";

const bytes: any = require('bytes');

// Addressing line 20 (https://en.wikipedia.org/wiki/A20_line)
const USE_A20 = false;
const A20_MASK = ~(1 << 20);
const A20_MASK16 = ~(1 << 20 - 1);
const A20_MASK32 = ~(1 << 20 - 2);

export class Memory extends Component {

    cpu: CPU;

    @serialize() size: number;

    @serialize() mem8: Uint8Array;
    @serialize() mem16: Uint16Array;
    @serialize() mem32s: Int32Array;

    @serialize() memory_map_read8: Array<any>;
    @serialize() memory_map_write8: Array<any>;
    @serialize() memory_map_read32: Array<any>;
    @serialize() memory_map_write32: Array<any>;

    constructor(_size: number | string) {
        super();

        let size = 0;

        if (typeof _size === 'string') {
            size = bytes(_size);
        } else {
            size = _size;
        }

        if (size < 1024 * 1024) { // Minimal of 1mb memory
            size = 1024 * 1024;
        }
        else if ((size | 0) < 0) {
            size = Math.pow(2, 31) - MMAP_BLOCK_SIZE;
        }

        size = ((size - 1) | (MMAP_BLOCK_SIZE - 1)) + 1 | 0;

        dbg_assert((size | 0) > 0);
        dbg_assert((size & MMAP_BLOCK_SIZE - 1) === 0);

        this.size = size;

        let buffer = new ArrayBuffer(size);

        this.mem8 = new Uint8Array(buffer);
        this.mem16 = new Uint16Array(buffer);
        this.mem32s = new Int32Array(buffer);

        // Still don't have a clue what these do
        this.memory_map_read8 = [];
        this.memory_map_write8 = [];
        this.memory_map_read32 = [];
        this.memory_map_write32 = [];

    }

    init(parent: Modular): void {
        this.cpu = parent.modules.cpu[0] as CPU;

        console.log(`Initializing Memory (${this.size} bytes)`);
    }

    debug_read(addr: number, size?: number, is_write?: boolean) {
        if (!DEBUG) {
            return;
        }

        dbg_assert(typeof addr === "number");
        dbg_assert(!isNaN(addr));
    }

    debug_write(addr: number, size: number, value: number) {
        if (!DEBUG) {
            return;
        }

        dbg_assert(typeof value === "number" && !isNaN(value));
        dbg_assert(value >= -0x80000000 && addr < 0x80000000);

        this.debug_read(addr, size, true);
    }

    mmap_read8(addr: number) {
        return this.memory_map_read8[addr >>> MMAP_BLOCK_BITS](addr);
    }

    mmap_write8(addr: number, value: number) {
        this.memory_map_write8[addr >>> MMAP_BLOCK_BITS](addr, value);
    }

    mmap_read16(addr: number) {
        const fn = this.memory_map_read8[addr >>> MMAP_BLOCK_BITS];
        return fn(addr) | fn(addr + 1 | 0) << 8;
    }

    mmap_write16(addr: number, value: number) {
        const fn = this.memory_map_write8[addr >>> MMAP_BLOCK_BITS];

        fn(addr, value & 0xFF);
        fn(addr + 1 | 0, value >> 8 & 0xFF);
    }

    mmap_read32(addr: number) {
        const aligned_addr = addr >>> MMAP_BLOCK_BITS;
        return this.memory_map_read32[aligned_addr](addr);
    }

    mmap_write32(addr: number, value: number) {
        const aligned_addr = addr >>> MMAP_BLOCK_BITS;
        this.memory_map_write32[aligned_addr](addr, value);
    }

    in_mapped_range(addr: number) {
        return (addr | 0) >= 0xA0000 && (addr | 0) < 0xC0000 || (addr >>> 0) >= (this.size >>> 0);
    };

    read8(addr: number) {
        this.debug_read(addr, 1);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            return this.mmap_read8(addr);
        } else {
            return this.mem8[addr];
        }
    }

    write8(addr: number, value: number) {
        this.debug_write(addr, 1, value);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            this.mmap_write8(addr, value);
        } else {
            this.mem8[addr] = value;
        }
    };

    read16(addr: number) {
        this.debug_read(addr, 2);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            return this.mmap_read16(addr);
        } else {
            return this.mem8[addr] | this.mem8[addr + 1 | 0] << 8;
        }
    }

    read_aligned16(addr: number) {
        dbg_assert(addr >= 0 && addr < 0x80000000);
        this.debug_read(addr << 1, 2);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK16;

        if (this.in_mapped_range(addr << 1)) {
            return this.mmap_read16(addr << 1);
        } else {
            return this.mem16[addr];
        }
    }

    write16(addr: number, value: number) {
        this.debug_write(addr, 2, value);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            this.mmap_write16(addr, value);
        } else {
            this.mem8[addr] = value;
            this.mem8[addr + 1 | 0] = value >> 8;
        }
    }

    write_aligned16(addr: number, value: number) {
        dbg_assert(addr >= 0 && addr < 0x80000000);
        this.debug_write(addr << 1, 2, value);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK16;

        if (this.in_mapped_range(addr << 1)) {
            this.mmap_write16(addr << 1, value);
        } else {
            this.mem16[addr] = value;
        }
    }

    read32s(addr: number) {
        this.debug_read(addr, 4);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            return this.mmap_read32(addr);
        } else {
            return this.mem8[addr] | this.mem8[addr + 1 | 0] << 8 |
                this.mem8[addr + 2 | 0] << 16 | this.mem8[addr + 3 | 0] << 24;
        }
    }

    read_aligned32(addr: number) {
        dbg_assert(addr >= 0 && addr < 0x40000000);
        this.debug_read(addr << 2, 4);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK32;

        if (this.in_mapped_range(addr << 2)) {
            return this.mmap_read32(addr << 2);
        } else {
            return this.mem32s[addr];
        }
    }

    write32(addr: number, value: number) {
        this.debug_write(addr, 4, value);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK;

        if (this.in_mapped_range(addr)) {
            this.mmap_write32(addr, value);
        } else {
            this.mem8[addr] = value;
            this.mem8[addr + 1 | 0] = value >> 8;
            this.mem8[addr + 2 | 0] = value >> 16;
            this.mem8[addr + 3 | 0] = value >> 24;
        }
    }

    write_aligned32(addr: number, value: number) {
        dbg_assert(addr >= 0 && addr < 0x40000000);
        this.debug_write(addr << 2, 4, value);
        if (USE_A20 && !this.cpu.a20_enabled) addr &= A20_MASK32;

        if (this.in_mapped_range(addr << 2)) {
            this.mmap_write32(addr << 2, value);
        } else {
            this.mem32s[addr] = value;
        }
    }

    write_blob(blob: any, offset: number) {
        this.debug_write(offset, blob.length, 0);
        dbg_assert(blob && blob.length >= 0);
        this.mem8.set(blob, offset);
    }

    write_blob32(blob: any, offset: number) {
        dbg_assert(blob && blob.length);
        this.debug_write(offset, blob.length << 2, 0);
        this.mem32s.set(blob, offset);
    }
}