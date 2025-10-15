function capitalizeWord(word: string): string {
    let isCapitalized = false;
    let indexCapitalized = 0;
    return word.split('').map((letter, index) => {
        if (index === indexCapitalized && letter.match(/[a-zA-Zá-úÁ-Úä-üÄ-Ü]/) && !isCapitalized) {
            isCapitalized = true;
            return letter.toUpperCase();
        } else {
            isCapitalized = false;
            indexCapitalized++;
        }
        return letter.toLowerCase();
    }).join('');
}
const text = {
    /**
     * Capitaliza la primera letra de cada palabra en un texto.
     * @param text - El texto a capitalizar.
     * @param allWords - Si es true, capitaliza todas las palabras; si es false, solo la primera palabra.
     * @returns El texto con las palabras capitalizadas.
     **/
    capitalize(text: string, allWords: boolean = false): string {
        if (allWords) {
            return text
                .split(' ')
                .map((word) => {
                    return capitalizeWord(word);
                }).join(' ');
        } else {
            return text
                .split(' ')
                .map((word, index) => {
                    if (index === 0) {
                        return capitalizeWord(word);
                    }
                    return word;
                }).join(' ');
        }
    },

    /**
     * Convierte un texto a formato CamelCase y elimina carácteres especiales.
     * @param text - El texto a convertir.
     * @returns El texto en formato CamelCase.
     **/
    camelCase(text: string): string {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+(.)/g, (m, chr) => chr.toUpperCase());
    },

    /**
     * Convierte un texto a formato KebabCase y elimina los carácteres especiales
     * @param text - El texto a convertir.
     * @returns El texto en formato KebabCase.
     **/
    kebabCase(text: string): string {
        return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
    },

    /**
     * Convierte un texto a formato SnakeCase y elimina carácteres especiales
     * @param text - El texto a convertir.
     * @returns El texto en formato SnakeCase.
     **/
    snakeCase(text: string): string {
        return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '_')
        .replace(/^-+|-+$/g, '')
        .replace(/_+/g, '_')
        .replace(/-+/g, '_');
    },

    /**
     * Invierte el orden de los caracteres en un texto.
     * @param text - El texto a invertir.
     * @returns El texto con los caracteres en orden inverso.
     **/
    reverse(text: string): string {
        return text.split('').reverse().join('');
    },

    /**
     * Normaliza un texto eliminando acentos y caracteres especiales.
     * @param text - El texto a normalizar.
     * @returns El texto normalizado.
     **/
    normalize(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/Ñ/g, 'N').replace(/[^a-zA-Z0-9\s]/g, '');
    }
};

export default text;