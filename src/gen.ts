const gen = {
    password(
        length: number,
        config?: {
            vowels?: boolean,
            consonants?: boolean,
            numbers?: boolean,
            mayus?: boolean,
            special?: boolean,
            hex?: boolean
        }
    ): string {
        let vowels = 'aeiou';
        let consonants = 'bcdfghjklmnñpqrstvwxyz';
        let numbers = '0123456789';
        let special = '!@#$%&*áéíóúäëïöü';
        let charset = '';
        let key = '';

        let defaultConfig = {
            vowels: true,
            consonants: true,
            numbers: true,
            mayus: false,
            special: false,
            hex: false
        };

        config = { ...defaultConfig, ...config };

        if (config.hex) {
            charset = '0123456789abcdef';
        } else {
            if (config.vowels) charset += vowels;
            if (config.consonants) charset += consonants;
            if (config.numbers) charset += numbers;
            if (config.special) charset += special;
        }

        let tch = '';
        for (let i = 0; i < length; i++) {
            tch = charset.charAt(Math.floor(Math.random() * (charset.length - 0 + 1)));
            if (config.mayus) {
                key += (Math.random() < 0.5) ? tch.toUpperCase() : tch;
            } else {
                key += tch;
            }
        }

        return key;
    },

    loremIpsum(quantity: number = 100): string {
        /*
            Basado en el Lorem Ipsum Generator de Rick Viscomi
            https://gist.github.com/rviscomi/1479649
            Copyright (c) 2009, Mathew Tinsley (tinsley@tinsology.net)
        */
        const WORDS_PER_SENTENCE_AVG = 24.460;
        const WORDS_PER_SENTENCE_STD = 5.080;
        const WORDS = [
            'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
            'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
            'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
            'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
            'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis',
            'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros',
            'dictum', 'proin', 'accumsan', 'sapien', 'nec', 'massa',
            'volutpat', 'venenatis', 'sed', 'eu', 'molestie', 'lacus',
            'quisque', 'porttitor', 'ligula', 'dui', 'mollis', 'tempus',
            'at', 'magna', 'vestibulum', 'turpis', 'ac', 'diam',
            'tincidunt', 'id', 'condimentum', 'enim', 'sodales', 'in',
            'hac', 'habitasse', 'platea', 'dictumst', 'aenean', 'neque',
            'fusce', 'augue', 'leo', 'eget', 'semper', 'mattis',
            'tortor', 'scelerisque', 'nulla', 'interdum', 'tellus', 'malesuada',
            'rhoncus', 'porta', 'sem', 'aliquet', 'et', 'nam', 'jt',
            'suspendisse', 'potenti', 'vivamus', 'luctus', 'fringilla', 'erat',
            'donec', 'justo', 'vehicula', 'ultricies', 'varius', 'ante',
            'primis', 'faucibus', 'ultrices', 'posuere', 'cubilia', 'curae',
            'etiam', 'cursus', 'aliquam', 'quam', 'dapibus', 'nisl',
            'feugiat', 'egestas', 'class', 'aptent', 'taciti', 'sociosqu',
            'ad', 'litora', 'torquent', 'per', 'conubia', 'nostra',
            'inceptos', 'himenaeos', 'phasellus', 'nibh', 'pulvinar', 'vitae',
            'urna', 'iaculis', 'lobortis', 'nisi', 'viverra', 'arcu',
            'morbi', 'pellentesque', 'metus', 'commodo', 'ut', 'facilisis',
            'felis', 'tristique', 'ullamcorper', 'placerat', 'aenean', 'convallis',
            'sollicitudin', 'integer', 'rutrum', 'duis', 'est', 'etiam',
            'bibendum', 'donec', 'pharetra', 'vulputate', 'maecenas', 'mi',
            'fermentum', 'consequat', 'suscipit', 'aliquam', 'habitant', 'senectus',
            'netus', 'fames', 'quisque', 'euismod', 'curabitur', 'lectus',
            'elementum', 'tempor', 'risus', 'cras'
        ];

        function gauss() { return (Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1) }
        function gaussMS(mean: number, standardDeviation: number) { return Math.round(gauss() * standardDeviation + mean) }
        function getRandomSentenceLength() { return Math.round(gaussMS(WORDS_PER_SENTENCE_AVG, WORDS_PER_SENTENCE_STD)) }
        function getRandomCommaCount(wordLength: number) { 
            const base = 6; const average = Math.log(wordLength) / Math.log(base);
            const standardDeviation = average / base; 
            return Math.round(gaussMS(average, standardDeviation));
        }
        function punctuate(sentence: string[]): string[] {
            const wordLength = sentence.length;
            sentence[wordLength - 1] += '.';
            if (wordLength < 4) {
                return sentence;
            }
            const numCommas = getRandomCommaCount(wordLength);
            for (let ii = 0; ii <= numCommas; ii += 1) {
                const position = Math.round(ii * wordLength / (numCommas + 1));
                if (position < (wordLength - 1) && position > 0) {
                    sentence[position] += ',';
                }
            }
            sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
            return sentence;
        }
        let numWords = quantity;
        const words = [WORDS[0], WORDS[1]];
        numWords -= 2;
        for (let ii = 0; ii < numWords; ii += 1) {
            const position = Math.floor(Math.random() * WORDS.length);
            const word = WORDS[position];
            if (ii > 0 && words[ii - 1] === word) {
                ii -= 1
            } else {
                words[ii] = word
            }
        }
        const sentences = [];
        let current = 0;
        while (numWords > 0) {
            let sentenceLength = getRandomSentenceLength();
            if (numWords - sentenceLength < 4) { sentenceLength = numWords }
            numWords -= sentenceLength;
            const sentence = [];
            for (let ii = current; ii < (current + sentenceLength); ii += 1) { sentence.push(words[ii]) }
            sentences.push(punctuate(sentence).join(' '));
            current += sentenceLength;
        }
        return sentences.join(' ');
    },

    ip: {
        v4: () => {
            let result: string[] = [];
            for(let i: number = 0; i < 4; i++){
                result.push(Math.floor(Math.random() * 256).toString());
            }
            return result.join('.');
        },
        v6: () => {
            let result: string[] = [];
            for(let i: number = 0; i < 8; i++){
                result.push(Math.floor(Math.random() * 65536).toString(16));
            }
            return result.join(':');
        }
    }
}

export default gen;