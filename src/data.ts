import CryptoJS from 'crypto-js';
import text from './text';

let salted = 'U2FsdGVkX1';

const data = {
    /**
     * Convierte un dato a un string homogeneizado para facilitar su almacenamiento y transporte.
     * @param data - El valor a convertir.
     * @param encrypt - Si se debe encriptar el resultado.
     * @param key - La clave de encriptación.
     * @returns El dato convertido a string homogeneizado.
     **/
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

    /**
     * Convierte un dato _stringifiado_ a su tipo original.
     * @param data - La cadena JSON a convertir.
     * @param encrypt - Si se debe desencriptar el resultado.
     * @param key - La clave de desencriptación.
     * @returns El valor convertido a su tipo original.
     **/
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

    /**
     * Encripta un contenido usando AES.
     * @param content - El contenido a encriptar.
     * @param key - La clave de encriptación.
     * @returns El contenido encriptado como string.
     **/
    encrypt(content: string, key: string): string {
        let contentEncrypted = CryptoJS.AES.encrypt(content, key).toString();
        return contentEncrypted.startsWith(salted) ? contentEncrypted.substring(10) : contentEncrypted;
    },

    /**
     * Desencripta un contenido encriptado usando AES.
     * @param content - El contenido encriptado a desencriptar.
     * @param key - La clave de desencriptación.
     * @returns El contenido desencriptado como string.
     **/
    decrypt(content: string, key: string): string {
        return CryptoJS.AES.decrypt(!content.startsWith(salted) ? salted + content : content, key).toString(CryptoJS.enc.Utf8);
    },

    /**
     * Genera un identificador único estático basado en el nombre proporcionado.
     * Siempre devuelve el mismo identificador para el mismo nombre.
     * @param name - El nombre a utilizar para generar el identificador.
     * @returns El identificador único generado.
     **/
    usid(name: string): string {
        return CryptoJS.MD5(text.camelCase(name.trim())).toString();
    }
}

export default data;