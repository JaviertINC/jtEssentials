import { iConfig } from './_interfaces';
import _cnsl from './cnsl';
import _obsv from './obsv';
import _data from './data';
import { Observable } from 'rxjs';

export default class strg {
    private obsv: _obsv;
    private cnsl: _cnsl; 

    constructor(private config: iConfig) {
        this.cnsl = new _cnsl(this.config);
        this.obsv = new _obsv(this.config);
    }

    private getResourceName(store: string): string {
        let resourceName = 'strg-' + store;
        this.config.data.encrypt && (resourceName = _data.usid(resourceName));
        return resourceName;
    }

    public create(store: string, data: any): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.create() • Creando strg', store, data);
        let resourceName = this.getResourceName(store);
        let storeData = this.get(store);
        if (storeData) {
            this.config.debug.strg && this.cnsl.warn('jtEssentials.strg.create() • El strg ya existe, se actualizará la información', store);
            this.update(store, data);
        }else{
            this.config.debug.strg && this.cnsl.log('jtEssentials.strg.create() • El strg no existe, se creará', store);
            localStorage.setItem(resourceName, _data.stringify(data, this.config.data.encrypt, this.config.data.key));

            this.trigger(store);
        }
    }

    public get(store: string): any {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.get() • Obteniendo strg', store);
        let data = localStorage.getItem(this.getResourceName(store));
        if (data) {
            return _data.parse(data, this.config.data.encrypt, this.config.data.key);
        } else {
            this.config.debug.strg && this.cnsl.warn('jtEssentials.strg.get() • No se encontró el strg', store);
            return null;
        }
    }

    public update(store: string, data: any): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.update() • Actualizando strg', store, data);
        // Obtiene el contenido actual del store
        let currentData = this.get(store);
        if (currentData) {
            // Actualiza el contenido del store con los nuevos datos
            let updatedData = { ...currentData, ...data };
            localStorage.setItem(this.getResourceName(store), _data.stringify(updatedData, this.config.data.encrypt, this.config.data.key));

            // Dispara el evento de actualización
            this.trigger(store);
        } else {
            this.config.debug.strg && this.cnsl.warn('jtEssentials.strg.update() • No se encontró el strg', store);
        }
    }

    public delete(store: string): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.delete() • Eliminando strg', store);
        localStorage.removeItem(this.getResourceName(store));
    }

    public watch(store: string, from: string): Observable<any> {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.watch() • Creando un observador para "' + store + '" desde "' + from + '"');
        let resourceName = this.getResourceName(store);
        from = this.config.data.encrypt ? _data.usid(from) : from;

        let obsrvble = new Observable((observer) => {
            this.obsv.add(resourceName, from);
            let eObsrvr = 'eo-' + resourceName + '@' + from;
            window.jtEssentialsEvents.addEventListener(eObsrvr, (event: any) => {
                this.config.debug.strg && this.cnsl.log('jtEssentials.strg.watch() • Se ha detectado una actualización del strg "' + store +'"', event);
                let data = this.get(store);
                if(!data) {
                    this.config.debug.strg && this.cnsl.warn('jtEssentials.strg.watch() • No se encontró el strg', store);
                    observer.error('No se encontró el strg');
                }else{
                    observer.next(data);
                }
            });
        });

        return obsrvble;
    }

    public unwatch(store: string, from: string): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.unwatch() • Eliminando el observador para "' + store + '" desde "' + from + '"');
        let resourceName = this.getResourceName(store);
        from = this.config.data.encrypt ? _data.usid(from) : from;
        let eObsrvr = 'eo-' + resourceName + '@' + from;
        window.jtEssentialsEvents.removeEventListener(eObsrvr, (event: any) => {
            this.config.debug.strg && this.cnsl.log('jtEssentials.strg.unwatch() • Se ha eliminado el observador para "' + store + '" desde "' + from + '"', event);
        });
        this.obsv.remove(resourceName, from);
    }

    public trigger(store: string): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.trigger() • Gatillando el evento de actualización del strg', store);
        let resourceName = this.getResourceName(store);
        let data = this.get(store);
        if (data) {
            let obsrvs = this.obsv.get(resourceName);
            obsrvs.forEach((from: string) => {
                let eObsrvr = 'eo-' + resourceName + '@' + from;
                window.jtEssentialsEvents.dispatchEvent(new CustomEvent(eObsrvr, { detail: data }));
                this.config.debug.strg && this.cnsl.log('jtEssentials.strg.trigger() • Evento de actualización del strg gatillado', store, data);
            });
        } else {
            this.config.debug.strg && this.cnsl.warn('jtEssentials.strg.trigger() • No se encontró el strg', store);
        }
    }
}