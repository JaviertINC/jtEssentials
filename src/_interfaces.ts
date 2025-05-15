export interface iConfig {
    project: {
        name: string,
        version: string,
        environment: string,
    },
    data: {
        encrypt: boolean,
        key: string,
    },
    debug: {
        cnsl: boolean,
        log: boolean,
        strg: boolean,
        obsv: boolean
    },
    log_quantity: number
}

export interface iLog {
    project: iConfig['project'],
    logs: any[]
}