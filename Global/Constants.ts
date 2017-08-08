export const LOG_ALL = -1;
export const LOG_NONE = 0;
export const LOG_OTHER = 0x000001;
export const LOG_CPU = 0x000002;
export const LOG_FPU = 0x000004;
export const LOG_MEM = 0x000008;
export const LOG_DMA = 0x000010;
export const LOG_IO = 0x000020;
export const LOG_PS2 = 0x000040;
export const LOG_PIC = 0x000080;
export const LOG_VGA = 0x000100;
export const LOG_PIT = 0x000200;
export const LOG_MOUSE = 0x000400;
export const LOG_PCI = 0x000800;
export const LOG_BIOS = 0x001000;
export const LOG_FLOPPY = 0x002000;
export const LOG_SERIAL = 0x004000;
export const LOG_DISK = 0x008000;
export const LOG_RTC = 0x010000;
export const LOG_HPET = 0x020000;
export const LOG_ACPI = 0x040000;
export const LOG_APIC = 0x080000;
export const LOG_NET = 0x100000;
export const LOG_VIRTIO = 0x200000;
export const LOG_9P = 0x400000;

export const LOG_NAMES = [
    [1, ""],
    [LOG_CPU, "CPU"],
    [LOG_DISK, "DISK"],
    [LOG_FPU, "FPU"],
    [LOG_MEM, "MEM"],
    [LOG_DMA, "DMA"],
    [LOG_IO, "IO"],
    [LOG_PS2, "PS2"],
    [LOG_PIC, "PIC"],
    [LOG_VGA, "VGA"],
    [LOG_PIT, "PIT"],
    [LOG_MOUSE, "MOUS"],
    [LOG_PCI, "PCI"],
    [LOG_BIOS, "BIOS"],
    [LOG_FLOPPY, "FLOP"],
    [LOG_SERIAL, "SERI"],
    [LOG_RTC, "RTC"],
    [LOG_HPET, "HPET"],
    [LOG_ACPI, "ACPI"],
    [LOG_APIC, "APIC"],
    [LOG_NET, "NET"],
    [LOG_VIRTIO, "VIO"],
    [LOG_9P, "9P"],
];

export const TLB_SYSTEM_READ = 1;
export const TLB_SYSTEM_WRITE = 2;
export const TLB_USER_READ = 4;
export const TLB_USER_WRITE = 8;

export const flag_carry = 1;
export const flag_parity = 4;
export const flag_adjust = 16;
export const flag_zero = 64;
export const flag_sign = 128;
export const flag_trap = 256;
export const flag_interrupt = 512;
export const flag_direction = 1024;
export const flag_overflow = 2048;
export const flag_iopl = 1 << 12 | 1 << 13;
export const flag_nt = 1 << 14;
export const flag_rf = 1 << 16;
export const flag_vm = 1 << 17;
export const flag_ac = 1 << 18;
export const flag_vif = 1 << 19;
export const flag_vip = 1 << 20;
export const flag_id = 1 << 21;

export const flags_default = 1 << 1;

export const flags_mask =
    flag_carry | flag_parity | flag_adjust | flag_zero | flag_sign | flag_trap | flag_interrupt |
    flag_direction | flag_overflow | flag_iopl | flag_nt | flag_rf | flag_vm | flag_ac |
    flag_vif | flag_vip | flag_id;

export const flags_all = flag_carry | flag_parity | flag_adjust | flag_zero | flag_sign | flag_overflow;

export const OPSIZE_8 = 7;
export const OPSIZE_16 = 15;
export const OPSIZE_32 = 31;

export const PSE_ENABLED = 128;

export const reg_eax = 0;
export const reg_ecx = 1;
export const reg_edx = 2;
export const reg_ebx = 3;
export const reg_esp = 4;
export const reg_ebp = 5;
export const reg_esi = 6;
export const reg_edi = 7;

export const reg_ax = 0;
export const reg_cx = 2;
export const reg_dx = 4;
export const reg_bx = 6;
export const reg_sp = 8;
export const reg_bp = 10;
export const reg_si = 12;
export const reg_di = 14;

export const reg_al = 0;
export const reg_cl = 4;
export const reg_dl = 8;
export const reg_bl = 12;
export const reg_ah = 1;
export const reg_ch = 5;
export const reg_dh = 9;
export const reg_bh = 13;

export const reg_es = 0;
export const reg_cs = 1;
export const reg_ss = 2;
export const reg_ds = 3;
export const reg_fs = 4;
export const reg_gs = 5;

export const reg_tr = 6; // task register
export const reg_ldtr = 7; // local descriptor table register

export const MMAP_BLOCK_BITS = 17;
export const MMAP_BLOCK_SIZE = 1 << MMAP_BLOCK_BITS;

export const MEM_PAGE_WRITTEN = 1;
export const MAGIC_CPU_EXCEPTION = 0xDEADBEE;

export const REPEAT_STRING_PREFIX_NONE = 0;
export const REPEAT_STRING_PREFIX_NZ = 1;
export const REPEAT_STRING_PREFIX_Z = 2;

export const CR0_PE = 1;
export const CR0_MP = 1 << 1;
export const CR0_EM = 1 << 2;
export const CR0_TS = 1 << 3;
export const CR0_ET = 1 << 4;
export const CR0_WP = 1 << 16;
export const CR0_NW = 1 << 29;
export const CR0_CD = 1 << 30;
export const CR0_PG = 1 << 31;

export const CR4_VME = 1;
export const CR4_PVI = 1 << 1;
export const CR4_TSD = 1 << 2;
export const CR4_PSE = 1 << 4;
export const CR4_DE = 1 << 3;
export const CR4_PAE = 1 << 5;
export const CR4_PGE = 1 << 7;
export const CR4_OSFXSR = 1 << 9;
export const CR4_OSXMMEXCPT = 1 << 10;

export const SEG_PREFIX_NONE = -1;
export const SEG_PREFIX_ZERO = 7;

export const IA32_SYSENTER_CS = 0x174;
export const IA32_SYSENTER_ESP = 0x175;
export const IA32_SYSENTER_EIP = 0x176;

export const IA32_TIME_STAMP_COUNTER = 0x10;
export const IA32_PLATFORM_ID = 0x17;
export const MSR_EBC_FREQUENCY_ID = 0x2C;
export const IA32_APIC_BASE_MSR = 0x1B;
export const IA32_BIOS_SIGN_ID = 0x8B;
export const IA32_MISC_ENABLE = 0x1A0;
export const IA32_RTIT_CTL = 0x570;
export const MSR_SMI_COUNT = 0x34;
export const IA32_MCG_CAP = 0x179;
export const IA32_KERNEL_GS_BASE = 0xC0000101 | 0;
export const MSR_PKG_C2_RESIDENCY = 0x60D;

export const IA32_APIC_BASE_BSP = 1 << 8;
export const IA32_APIC_BASE_EXTD = 1 << 10;
export const IA32_APIC_BASE_EN = 1 << 11;

export const TSR_BACKLINK = 0x00;
export const TSR_CR3 = 0x1C;
export const TSR_EIP = 0x20;
export const TSR_EFLAGS = 0x24;

export const TSR_EAX = 0x28;
export const TSR_ECX = 0x2c;
export const TSR_EDX = 0x30;
export const TSR_EBX = 0x34;
export const TSR_ESP = 0x38;
export const TSR_EBP = 0x3c;
export const TSR_ESI = 0x40;
export const TSR_EDI = 0x44;

export const TSR_ES = 0x48;
export const TSR_CS = 0x4c;
export const TSR_SS = 0x50;
export const TSR_DS = 0x54;
export const TSR_FS = 0x58;
export const TSR_GS = 0x5c;
export const TSR_LDT = 0x60;

export const FW_CFG_SIGNATURE = 0x00;
export const FW_CFG_RAM_SIZE = 0x03;
export const FW_CFG_NB_CPUS = 0x05;

export const PREFIX_MASK_REP = 0b11000;
export const PREFIX_REPZ = 0b01000;
export const PREFIX_REPNZ = 0b10000;
export const PREFIX_MASK_SEGMENT = 0b111;
export const PREFIX_MASK_OPSIZE = 0b100000;
export const PREFIX_MASK_ADDRSIZE = 0b1000000;
export const PREFIX_F2 = PREFIX_REPNZ; // alias
export const PREFIX_F3 = PREFIX_REPZ; // alias
export const PREFIX_66 = PREFIX_MASK_OPSIZE; // alias

export const MXCSR_MASK = (0xFFFF & ~(1 << 6));
