export interface iConfig {
    project: {
        name: string;
        version: string;
        environment: string;
    },
    data: {
        encrypt: boolean;
        key: string;
    },
    debug: {
        cnsl: boolean;
        log: boolean;
        strg: boolean;
        obsv: boolean;
    }
}