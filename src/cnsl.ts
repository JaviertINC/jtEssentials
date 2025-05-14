import { iConfig } from "./_interfaces";

export default class cnsl {
    constructor(private config: iConfig){}

    public log(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cLOG • ' + args[0],
            `color: #fff; background-color: gray; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    public info(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cINFO • ' + args[0],
            `color: #fff; background-color: #2196F3; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    public warn(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cWARN • ' + args[0],
            `color: #fff; background-color: #FF9800; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    public error(...args: any[]) {
        if (this.config.debug.cnsl) console.log(
            '%cERROR • ' + args[0],
            `color: #fff; background-color: #F44336; padding: 3px 5px; border-radius: 5px 0 5px 0; font-weight: bold; margin: 8px 0; line-height: 19px;`,
            '\n',
            ...args.slice(1)
        );
    }

    public table(...args: any[]) {
        if (this.config.debug.cnsl) console.table(...args);
    }

    public clear() {
        if (this.config.debug.cnsl) console.clear();
    }
}