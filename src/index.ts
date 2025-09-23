import { iConfig } from "./_interfaces.js";
import data from "./data.js";
import _cnsl from "./cnsl.js";
import text from "./text.js";
import date from "./date.js";
import util from "./util.js";
import gen from "./gen.js";
import _log from "./log.js";
import _obsv from "./obsv.js";
import _strg from "./strg.js";

declare global {
    interface Window {
        jtEssentialsEvents: Window;
    }
}

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
    public log: _log;
    public obsv: _obsv;
    public strg: _strg;

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
        if(!this.config.data) {
            this.config.data = {
                encrypt: false,
                key: ''
            };
        }
        if(!this.config.data.encrypt) {
            this.config.data.encrypt = false;
        }
        if(this.config.data.encrypt && !this.config.data.key) {
            throw new Error('La clave de encriptación es requerida si la encriptación está habilitada.');
        }
        if(!this.config.debug) {
            this.config.debug = {
                cnsl: false,
                log: false,
                strg: false,
                obsv: false
            };
        }
        if(!this.config.debug.cnsl) {
            this.config.debug.cnsl = false;
        }
        if(!this.config.debug.log) {
            this.config.debug.log = false;
        }
        if(!this.config.debug.strg) {
            this.config.debug.strg = false;
        }
        if(!this.config.debug.obsv) {
            this.config.debug.obsv = false;
        }
        if(!this.config.log_quantity) {
            this.config.log_quantity = 100;
        }
        if(this.config.log_quantity < 0) {
            throw new Error('La cantidad de registros no puede ser menor a 0.');
        }
        if(this.config.log_quantity > 1000) {
            console.warn('La cantidad de registros es mayor a 1000. Esto puede afectar el rendimiento de la aplicación.');
        }

        this.cnsl = new _cnsl(this.config);
        this.log = new _log(this.config);
        this.obsv = new _obsv(this.config);
        this.strg = new _strg(this.config);
    }
}