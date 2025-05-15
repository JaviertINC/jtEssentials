import { iConfig } from "./_interfaces";
import data from "./data";
import _cnsl from "./cnsl";
import text from "./text";
import date from "./date";
import util from "./util";
import gen from "./gen";
import _log from "./log";
import _obsv from "./obsv";

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

    constructor(
        public config: iConfig
    ){
        if(!this.config) {
            throw new Error('La configuración es requerida para inicializar la clase.');
        }

        this.cnsl = new _cnsl(this.config);
        this.log = new _log(this.config);
        this.obsv = new _obsv(this.config);
    }
}