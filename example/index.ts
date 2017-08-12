import {Emulator} from "../index";
import {x86CPU} from "../Components/x86CPU";
import {Memory} from "../Components/Memory";
import {Bios} from "../Components/Bios";

const emu = new Emulator();

emu.addModule(new x86CPU());
emu.addModule(new Memory('64mb'));

emu.addModule(new Bios(`${__dirname}/images/seabios.bin`));

emu.powerOn();
