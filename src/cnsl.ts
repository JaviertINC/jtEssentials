import { iConfig } from "./_interfaces";

export default class cnsl {
    constructor(private config: iConfig){}

    /**
     * Muestra un mensaje en la consola con estilo personalizado. Es ocultable en producción.
     * @param args - Mensaje a mostrar en la consola. El primer argumento es el título del mensaje, los siguientes son el contenido.
     **/
    public log(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cLOG • ' + args[0],
            `color: #fff; background-color: gray; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    /**
     * Muestra un mensaje de información en la consola con estilo personalizado. Es ocultable en producción.
     * @param args - Mensaje a mostrar en la consola. El primer argumento es el título del mensaje, los siguientes son el contenido.
     **/
    public info(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cINFO • ' + args[0],
            `color: #fff; background-color: #2196F3; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    /**
     * Muestra un mensaje de advertencia en la consola con estilo personalizado. Es ocultable en producción.
     * @param args - Mensaje a mostrar en la consola. El primer argumento es el título del mensaje, los siguientes son el contenido.
     **/
    public warn(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cWARN • ' + args[0],
            `color: #fff; background-color: #FF9800; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    /**
     * Muestra un mensaje de error en la consola con estilo personalizado. Es ocultable en producción.
     * @param args - Mensaje a mostrar en la consola. El primer argumento es el título del mensaje, los siguientes son el contenido.
     **/
    public error(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cERROR • ' + args[0],
            `color: #fff; background-color: #F44336; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    /**
     * Muestra un mensaje en la consola en formato tabla. Es ocultable en producción.
     * @param args - Argumentos a mostrar en la tabla. El primer argumento es el título de la tabla, los siguientes son los datos.
     **/
    public table(...args: any[]) {
        if (this.config.debug.cnsl) console.table(...args);
    }
}