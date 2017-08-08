import {
    LOG_9P, LOG_ALL, LOG_DISK, LOG_DMA, LOG_FLOPPY, LOG_NET, LOG_PIC, LOG_PIT, LOG_PS2, LOG_SERIAL,
    LOG_VIRTIO
} from "./Constants";

/*
 * Compile time configuration, some only relevant for debug mode
 */

/**
 * @define {boolean}
 * Overridden for production by closure compiler
 */
export const DEBUG = false;

/** @const */
export const LOG_TO_FILE = false;

/**
 * @const
 * Enables logging all IO port reads and writes. Very verbose
 */
export const LOG_ALL_IO = false;

/**
 * @const
 * Enables logging of page faults, quite verbose
 */
export const LOG_PAGE_FAULTS = false;

export const LOG_LEVEL = LOG_ALL & ~LOG_PS2 & ~LOG_PIT & ~LOG_VIRTIO & ~LOG_9P & ~LOG_PIC &
    ~LOG_DMA & ~LOG_SERIAL & ~LOG_NET & ~LOG_FLOPPY & ~LOG_DISK;


/** @const */
export const ENABLE_HPET = DEBUG && false;

/** @const */
export const ENABLE_ACPI = false;

/**
 * @const
 * How many cycles the CPU does at a time before running hardware timers
 */
export const LOOP_COUNTER = 11001;

/**
 * @const
 * How often, in milliseconds, to yield to the browser for rendering and
 * running events
 */
export const TIME_PER_FRAME = 1;

/**
 * @const
 * How many ticks the TSC does per millisecond
 */
export const TSC_RATE = 8 * 1024;

/** @const */
export const APIC_TIMER_FREQ = TSC_RATE;

/** @const */
export const VMWARE_HYPERVISOR_PORT = true;
