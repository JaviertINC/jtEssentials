import { iConfig } from "./_interfaces";
import _cnsl from "./cnsl";
import _data from "./data";

export default class obsv {
    private storeName: string;
    private cnsl: _cnsl;

    constructor(private config: iConfig) {
        this.cnsl = new _cnsl(this.config);
        this.storeName = this.config.data.encrypt ? _data.usid('obsv' + this.config.project.name) : 'obsv' + this.config.project.name;
    }

    public getAll(): { [key: string]: string[] }[] {
        this.config.debug.obsv && this.cnsl.log('jtEssentials.obsv.getAll() • Obteniendo observadores');
        let store = localStorage.getItem(this.storeName);
        if(!store) {
            this.config.debug.obsv && this.cnsl.warn('jtEssentials.obsv.getAll() • No se encontraron observadores');
            return [];
        }
        return _data.parse(store, this.config.data.encrypt, this.config.data.key) || [];
    }
    
    public get(resourceName: string): string[] {
        this.config.debug.obsv && this.cnsl.log('jtEssentials.obsv.get() • Obteniendo observador', resourceName);
        let store = this.getAll();
        let resource = store.find((item: { [key: string]: string[] }) => Object.keys(item)[0] === resourceName);
        if (!resource) {
            this.config.debug.obsv && this.cnsl.warn('jtEssentials.obsv.get() • No se encontró el observador', resourceName);
            return [];
        }
        return resource[resourceName];
    }

    public add(resourceName: string, from: string): void {
        this.config.debug.obsv && this.cnsl.log('jtEssentials.obsv.add() • Agregando observador', resourceName, from);
        let store = this.getAll();
        let resource = store.find((item: { [key: string]: string[] }) => Object.keys(item)[0] === resourceName);
        if (resource) {
            resource[resourceName].push(from);
        } else {
            store.push({ [resourceName]: [from] });
        }
        localStorage.setItem(this.storeName, _data.stringify(store, this.config.data.encrypt, this.config.data.key));
    }

    public remove(resourceName: string, from: string): void {
        this.config.debug.obsv && this.cnsl.log('jtEssentials.obsv.remove() • Eliminando observador', resourceName, from);
        let store = this.getAll();
        let resource = store.find((item: { [key: string]: string[] }) => Object.keys(item)[0] === resourceName);
        if (resource) {
            resource[resourceName] = resource[resourceName].filter((item: string) => item !== from);
            if (resource[resourceName].length === 0) {
                store = store.filter((item: { [key: string]: string[] }) => Object.keys(item)[0] !== resourceName);
            }
            localStorage.setItem(this.storeName, _data.stringify(store, this.config.data.encrypt, this.config.data.key));
        } else {
            this.config.debug.obsv && this.cnsl.warn('jtEssentials.obsv.remove() • No se encontró el observador', resourceName, from);
        }
    }
}