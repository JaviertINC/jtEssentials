import { iConfig } from "./_interfaces";

export default class jtEssentials {    
    constructor(
        public config: iConfig
    ){
        if(!config) {
            throw new Error('La configuración es requerida para inicializar la clase.');
        }
    }
}