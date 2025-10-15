import { iLog } from './_interfaces.js';
import _cnsl from './cnsl.js';
import _data from './data.js';
import _text from './text.js';

let defaultLog: iLog = {
    project: { name: 'jt@essentials::log' },
    quantity: 100,
    logs: []
};

let storageName = _data.usid(defaultLog.project.name);
let storageKey = _data.usid(defaultLog.project.name + '::encrypted');
let sss = (logElement: iLog) => { //SessionStorageSave
    sessionStorage.setItem(storageName, _data.stringify(logElement, storageKey));
};

const Log = {
    /**
     * Establece la configuración inicial para este proyecto.
     * @param config Objeto con las configuraciones del log.
     */
    setup(config: { project: any, quantity: number }) {
        let logElement: iLog = this.get();
        logElement.project = config.project;
        logElement.quantity = config.quantity;
        sss(logElement);
    },

    /**
     * Obtiene los registros almacenados en la sesión.
     * @returns Los registros almacenados.
     **/
    get(): iLog {
        let logElement: iLog = _data.parse(sessionStorage.getItem(storageName) || '', storageKey) || defaultLog;
        (logElement.logs.length > logElement.quantity) && logElement.logs.shift();
        return logElement;
    },

    /**
     * Agrega un nuevo registro a los registros almacenados en la sesión.
     * @param log - El registro a agregar.
     **/
    push(log: any): void {
        let logElement: iLog = this.get();
        logElement.logs.push(log);
        sss(logElement);
    },

    /**
     * Limpia los logs, sin eliminar la configuración del setup.
     **/
    clear(): void {
        let logElement: iLog = this.get();
        logElement.logs = [];
        sss(logElement);
    },

    /**
     * Elimina por completo los logs.
     */
    remove(): void {
        sessionStorage.removeItem(storageName);
    },

    /**
     * Exporta los registros almacenados en la sesión a un archivo JSON.
     * El archivo se descargará automáticamente con un nombre basado en el nombre del proyecto y la fecha actual.
     **/
    export(): void {
        let logElement: iLog = this.get();
        let blob = new Blob([JSON.stringify(logElement)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = _text.kebabCase(logElement.project.name) + '-' + Date.now() + '.jtlog.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

export default Log;