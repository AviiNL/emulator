import {Emulator} from "../index";
import {x86CPU} from "../Components/x86CPU";
import {Memory} from "../Components/Memory";
import {Bios} from "../Components/Bios";
import {VGABios} from "../Components/VGABios";
// import {app, BrowserWindow, Notification} from "electron";

const emu = new Emulator();

emu.addModule(new x86CPU());
emu.addModule(new Memory('64mb'));

emu.addModule(new Bios(`${__dirname}/images/seabios.bin`));
emu.addModule(new VGABios(`${__dirname}/images/vgabios.bin`));

emu.powerOn();


// app.on('ready', () => {
//     let browser = new BrowserWindow();
//     // Load canvas or something in the browser and render the screen in thar!
//
// });

