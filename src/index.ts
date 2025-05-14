import { iConfig } from "./_interfaces";
import data from "./data";

export default class jtEssentials {    
    public data = data;

    constructor(
        public config: iConfig
    ){
        if(!config) {
            throw new Error('La configuración es requerida para inicializar la clase.');
        }
    }
}