import { iConfig, iLog } from './_interfaces';
import _cnsl from './cnsl';
import _data from './data';
import _text from './text';

export default class Log {
    private cnsl: _cnsl;
    private defaultLog: iLog;
    private storageName = this.config.data.encrypt ? _data.usid('log' + _text.normalize(this.config.project.name)) : _text.camelCase('log' + _text.normalize(this.config.project.name));

    constructor(private config: iConfig) {
        this.cnsl = new _cnsl(this.config);
        this.defaultLog = {
            project: config.project,
            logs: []
        };
    }

    /**
     * Obtiene los registros almacenados en la sesión.
     * @returns Los registros almacenados.
     **/
    get(): iLog {
        this.config.debug.log && this.cnsl.log('jtEssentials.log.get() • Obteniendo registros', this.storageName);
        let logElement: iLog = _data.parse(sessionStorage.getItem(this.storageName) || '', this.config.data.encrypt, this.config.data.key) || this.defaultLog;
        (logElement.logs.length > this.config.log_quantity) && logElement.logs.shift();
        return logElement;
    }

    /**
     * Agrega un nuevo registro a los registros almacenados en la sesión.
     * @param log - El registro a agregar.
     **/
    push(log: any): void {
        this.config.debug.log && this.cnsl.log('jtEssentials.log.push() • Agregando registro', this.storageName);
        let logElement: iLog = this.get();
        logElement.logs.push(log);
        sessionStorage.setItem(this.storageName, _data.stringify(logElement, this.config.data.encrypt, this.config.data.key));
    }
    
    /**
     * Elimina un registro específico de los registros almacenados en la sesión.
     * @param log - El registro a eliminar.
     **/
    clear(): void {
        this.config.debug.log && this.cnsl.log('jtEssentials.log.clear() • Limpiando registros', this.storageName);
        sessionStorage.removeItem(this.storageName);
    }

    /**
     * Exporta los registros almacenados en la sesión a un archivo JSON.
     * El archivo se descargará automáticamente con un nombre basado en el nombre del proyecto y la fecha actual.
     **/
    export(): void {
        this.config.debug.log && this.cnsl.log('jtEssentials.log.export() • Exportando registros', this.storageName);
        let logElement: iLog = this.get();
        let blob = new Blob([JSON.stringify(logElement)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = _text.kebabCase('log ' + this.config.project.name) + '-' + new Date().toISOString().split('.')[0] + '.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}