import {Component} from "../../Abstractions/Component";
import {Emulator} from "../../index";
import {Modular} from "../../Abstractions/Modular";
import {x86CPU} from "../x86CPU";
import {CPU} from "../../Abstractions/CPU";
import {IO} from "./IO";

export const CMOS_RTC_SECONDS = 0x00;
export const CMOS_RTC_SECONDS_ALARM = 0x01;
export const CMOS_RTC_MINUTES = 0x02;
export const CMOS_RTC_MINUTES_ALARM = 0x03;
export const CMOS_RTC_HOURS = 0x04;
export const CMOS_RTC_HOURS_ALARM = 0x05;
export const CMOS_RTC_DAY_WEEK = 0x06;
export const CMOS_RTC_DAY_MONTH = 0x07;
export const CMOS_RTC_MONTH = 0x08;
export const CMOS_RTC_YEAR = 0x09;
export const CMOS_STATUS_A = 0x0a;
export const CMOS_STATUS_B = 0x0b;
export const CMOS_STATUS_C = 0x0c;
export const CMOS_STATUS_D = 0x0d;
export const CMOS_RESET_CODE = 0x0f;

export const CMOS_FLOPPY_DRIVE_TYPE = 0x10;
export const CMOS_DISK_DATA = 0x12;
export const CMOS_EQUIPMENT_INFO = 0x14;
export const CMOS_MEM_BASE_LOW = 0x15;
export const CMOS_MEM_BASE_HIGH = 0x16;
export const CMOS_MEM_OLD_EXT_LOW = 0x17;
export const CMOS_MEM_OLD_EXT_HIGH = 0x18;
export const CMOS_DISK_DRIVE1_TYPE = 0x19;
export const CMOS_DISK_DRIVE2_TYPE = 0x1a;
export const CMOS_DISK_DRIVE1_CYL = 0x1b;
export const CMOS_DISK_DRIVE2_CYL = 0x24;
export const CMOS_MEM_EXTMEM_LOW = 0x30;
export const CMOS_MEM_EXTMEM_HIGH = 0x31;
export const CMOS_CENTURY = 0x32;
export const CMOS_MEM_EXTMEM2_LOW = 0x34;
export const CMOS_MEM_EXTMEM2_HIGH = 0x35;
export const CMOS_BIOS_BOOTFLAG1 = 0x38;
export const CMOS_BIOS_DISKTRANSFLAG = 0x39;
export const CMOS_BIOS_BOOTFLAG2 = 0x3d;
export const CMOS_MEM_HIGHMEM_LOW = 0x5b;
export const CMOS_MEM_HIGHMEM_MID = 0x5c;
export const CMOS_MEM_HIGHMEM_HIGH = 0x5d;
export const CMOS_BIOS_SMP_COUNT = 0x5f;

/**
 * Real Time Clock
 */
export class RTC extends Component {

    cpu: CPU;

    cmos_index: number;
    cmos_data: Uint8Array;
    rtc_time: number;
    last_update: number;

    next_interrupt: number;
    periodic_interrupt: boolean;
    periodic_interrupt_time: number;

    cmos_a: number;
    cmos_b: number;
    cmos_c: number;
    nmi_disabled: number;

    constructor() {
        super();

        this.cmos_index = 1;
        this.cmos_data = new Uint8Array(128);

        this.rtc_time = Date.now();
        this.last_update = this.rtc_time;

        this.next_interrupt = 0;
        this.periodic_interrupt = false;

        this.periodic_interrupt_time = 1000 / 1024;

        this.cmos_a = 0x26;
        this.cmos_b = 2;
        this.cmos_c = 0;

        this.nmi_disabled = 0;
    }

    init(cpu: Modular) {
        this.cpu = cpu as x86CPU;

        let io = cpu.getModule('io') as IO;

        io.register_read(0x71, this, this.cmos_port_read);
        io.register_write(0x71, this, this.cmos_port_write);
    }

    cmos_port_read(): void {
        throw new Error("Method not implemented.");
    }

    cmos_port_write(data: any): void {
        throw new Error("Method not implemented.");
    }
}