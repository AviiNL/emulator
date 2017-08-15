import {Component} from "../Abstractions/Component";
import {Modular} from "../Abstractions/Modular";
import {Emulator} from "../index";
import * as fs from "fs";
import {serialize, Serializer} from "../Helpers/Serializer";
import * as path from "path";
import {FileLoader} from "../Abstractions/FileLoader";

export class Bios extends FileLoader {
}