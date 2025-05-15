import CryptoJS from 'crypto-js';
import text from './text';

let salted = 'U2FsdGVkX1';

const data = {
    stringify(data: any, encrypt: boolean = false, key: string = ""): string {
        if (encrypt && key === "") {
            console.error('javiertinc@essentials • DATA\n\tNo se ha definido la clave de encriptación');
            return "undefined";
        }

        let stringifiedData: { type: string, data: string } = {
            type: 'undefined',
            data: 'undefined'
        };
        if (typeof data === 'object') {
            stringifiedData = {
                type: 'object',
                data: JSON.stringify(data)
            };
        } else if (typeof data === 'undefined') {
            stringifiedData = {
                type: 'undefined',
                data: 'undefined'
            };
        } else if (typeof data === 'number') {
            stringifiedData = {
                type: 'number',
                data: data.toString()
            };
        } else if (typeof data === 'boolean') {
            stringifiedData = {
                type: 'boolean',
                data: data.toString()
            };
        } else if (typeof data === 'string') {
            stringifiedData = {
                type: 'string',
                data: data
            };
        } else if (typeof data === 'symbol') {
            stringifiedData = {
                type: 'symbol',
                data: data.toString()
            };
        } else if (typeof data === 'bigint') {
            stringifiedData = {
                type: 'bigint',
                data: data.toString()
            };
        } else {
            stringifiedData = {
                type: 'unsupported',
                data: 'type not supported (' + typeof data + ')'
            }
        }
        return encrypt ? this.encrypt(JSON.stringify(stringifiedData), key) : JSON.stringify(stringifiedData);
    },

    parse(data: string, encrypt: boolean = false, key: string = ""): any {
        if (encrypt && key === "") {
            console.error('javiertinc@essentials • DATA\n\tNo se ha definido la clave de encriptación');
            return undefined;
        }

        if (!data) return undefined;
        let parsedData: { type: string, data: string } = encrypt ? JSON.parse(this.decrypt(data, key)) : JSON.parse(data);
        switch (parsedData.type) {
            case 'object':
                return JSON.parse(parsedData.data);
            case 'number':
                return Number(parsedData.data);
            case 'boolean':
                return parsedData.data === 'true';
            case 'string':
                return parsedData.data;
            case 'symbol':
                return Symbol(parsedData.data);
            case 'bigint':
                return BigInt(parsedData.data);
            case 'undefined':
                return undefined;
            case 'unsupported':
                return null;
            default:
                return parsedData.data;
        }
    },

    encrypt(content: string, key: string): string {
        let contentEncrypted = CryptoJS.AES.encrypt(content, key).toString();
        return contentEncrypted.startsWith(salted) ? contentEncrypted.substring(10) : contentEncrypted;
    },

    decrypt(content: string, key: string): string {
        return CryptoJS.AES.decrypt(!content.startsWith(salted) ? salted + content : content, key).toString(CryptoJS.enc.Utf8);
    },

    usid(name: string): string {
        return CryptoJS.MD5(text.camelCase(name.trim())).toString();
    }
}

export default data;