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

    /**
     * Obtiene el nombre del recurso de almacenamiento basado en el nombre del store.
     * @param store - El nombre del store.
     * @returns El nombre del recurso de almacenamiento.
     */
    private getResourceName(store: string): string {
        let resourceName = 'strg-' + store;
        this.config.data.encrypt && (resourceName = _data.usid(resourceName));
        return resourceName;
    }

    /**
     * Crea un nuevo store en el almacenamiento local.
     * Si el store ya existe, se actualizará con los nuevos datos.
     * @param store - El nombre del store a crear o actualizar.
     * @param data - Los datos a almacenar en el store.
     **/
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

    /**
     * Obtiene los datos almacenados en un store específico.
     * @param store - El nombre del store del cual se desean obtener los datos.
     * @returns Los datos almacenados en el store, o null si no existe.
     **/
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

    /**
     * Actualiza los datos de un store específico.
     * Si el store no existe, se creará uno nuevo con los datos proporcionados.
     * @param store - El nombre del store a actualizar.
     * @param data - Los nuevos datos a almacenar en el store.
     **/
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

    /**
     * Elimina un store específico del almacenamiento local.
     * @param store - El nombre del store a eliminar.
     **/
    public delete(store: string): void {
        this.config.debug.strg && this.cnsl.log('jtEssentials.strg.delete() • Eliminando strg', store);
        localStorage.removeItem(this.getResourceName(store));
    }

    /**
     * Crea un observador para un store específico.
     * El observador se activará cuando se detecte una actualización en el store.
     * @param store - El nombre del store a observar.
     * @param from - Desde dónde se está creando el observador (puede ser un nombre de componente, función, etc.).
     * @returns Un Observable que emite los datos del store cuando se actualiza.
     **/
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

    /**
     * Elimina un observador de un store específico.
     * @param store - El nombre del store del cual se desea eliminar el observador.
     * @param from - Desde dónde se está eliminando el observador (puede ser un nombre de componente, función, etc.).
     **/
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

    /**
     * Gatilla el evento de actualización del store.
     * Este método se utiliza para notificar a los observadores que el store ha sido actualizado.
     * @param store - El nombre del store que ha sido actualizado.
     **/
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