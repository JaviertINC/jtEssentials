import { iConfig } from "./_interfaces";
import data from "./data";
import _cnsl from "./cnsl";

export default class jtEssentials {

    public data = data;
    public cnsl: _cnsl;

    constructor(
        public config: iConfig
    ){
        if(!this.config) {
            throw new Error('La configuración es requerida para inicializar la clase.');
        }

        this.cnsl = new _cnsl(this.config);
    }
}