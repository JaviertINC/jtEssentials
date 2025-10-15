import { iConfig } from "./_interfaces.js";
import data from "./data.js";
import _cnsl from "./cnsl.js";
import text from "./text.js";
import date from "./date.js";
import util from "./util.js";
import gen from "./gen.js";
import log from "./log.js";

/* 

MIT License

Copyright (c) 2025 Luis Cortés (@JaviertINC)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

export default class jtEssentials {

    public data = data;
    public cnsl: _cnsl;
    public text = text;
    public date = date;
    public util = util;
    public gen = gen;
    public log = log;

    constructor(
        public config: iConfig
    ){
        if(!this.config) {
            throw new Error('La configuración es requerida para inicializar la clase.');
        }
        // Validar la configuración
        if(!this.config.project) {
            throw new Error('La configuración del proyecto es requerida.');
        }
        if(!this.config.project.name) {
            throw new Error('El nombre del proyecto es requerido.');
        }
        if(!this.config.project.version) {
            throw new Error('La versión del proyecto es requerida.');
        }
        if(!this.config.project.environment) {
            throw new Error('El entorno del proyecto es requerido.');
        }
        if(!this.config.debug) {
            this.config.debug = {
                cnsl: false
            };
        }
        if(!this.config.debug.cnsl) {
            this.config.debug.cnsl = false;
        }

        this.cnsl = new _cnsl(this.config);
    }
}