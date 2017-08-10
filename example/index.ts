import {Emulator} from "../index";
import {x86CPU} from "../Components/x86CPU";
import {Memory} from "../Components/Memory";
import {Bus} from "../Components/Bus";

const emu = new Emulator();

// internal, this will already be done if they are not added through here
// cpu.addModule(new IO());
// cpu.addModule(new PIT());
// cpu.addModule(new RTC());

emu.addModule(new x86CPU(true));
emu.addModule(new Memory('64MB'));

emu.powerOn();