export interface iConfig {
    project: {
        name: string, // Nombre del proyecto
        version: string, // Versión del proyecto
        environment: string, // Entorno de ejecución (ej: 'development', 'production', 'test')
    },
    data: {
        encrypt: boolean, // Controla si los datos se encriptan al guardarlos
        key: string, // Clave de encriptación para los datos
    },
    debug: {
        cnsl: boolean, // Controla si se muestran los mensajes de consola
        log: boolean, // Controla si se muetran los logs internos al usar la función log
        strg: boolean, // Controla si se muestran los mensajes de almacenamiento
        obsv: boolean // Controla si se muestran los mensajes de observación
    },
    log_quantity: number // Cantidad de logs a guardar en el almacenamiento de la sesión
}

export interface iLog {
    project: iConfig['project'],
    logs: any[]
}

export interface iWatcher {
    subscribe(callback: (data: any) => void): () => void;
}