import {Emulator} from "../index";
import {x86CPU} from "../Components/x86CPU";
import {Memory} from "../Components/Memory";

const emu = new Emulator();

// internal, this will already be done if they are not added through here
// cpu.addModule(new IO());
// cpu.addModule(new PIT());
// cpu.addModule(new RTC());

let cpu = new x86CPU(true);

emu.addModule(cpu);
emu.addModule(new Memory('64MB'));

emu.powerOn();
