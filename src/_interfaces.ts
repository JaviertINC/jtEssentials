export interface iConfig {
    project: {
        name: string, // Nombre del proyecto
        version: string, // Versión del proyecto
        environment: string, // Entorno de ejecución (ej: 'development', 'production', 'test')
    },
    debug: {
        cnsl: boolean, // Controla si se muestran los mensajes de consola
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