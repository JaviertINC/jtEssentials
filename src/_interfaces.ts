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
        strg: boolean, // Controla si se muestran los mensajes de almacenamiento
        obsv: boolean // Controla si se muestran los mensajes de observación
    }
}

export interface iLog {
    project: any,
    quantity: number,
    logs: any[]
}

export interface iWatcher {
    subscribe(callback: (data: any) => void): () => void;
}