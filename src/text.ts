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

    camelCase(text: string): string {
        return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    },

    kebabCase(text: string): string {
        return text.toLowerCase().replace(/ /g, '-');
    },

    snakeCase(text: string): string {
        return text.toLowerCase().replace(/ /g, '_');
    },

    reverse(text: string): string {
        return text.split('').reverse().join('');
    },

    normalize(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ñ/g, 'n').replace(/Ñ/g, 'N');
    }
}

export default text;