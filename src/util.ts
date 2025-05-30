const util = {
    /**
     * Enmascara un texto con un patrón especifico.
     * @param text - El texto a enmascarar.
     * @param mask - El patrón de enmascaramiento. Los caracteres especiales son:
     *              - '*' para cualquier carácter (incluye números y letras).
     *              - '0' para un dígito numérico.
     *              - 'A' para una letra (mayúscula o minúscula, incluyendo acentos).
     *              - 'X' para un carácter que se mostrará en privado (se muestra como '*' en público).
     *              - Cualquier otro carácter se mostrará tal cual.
     **/
    mask(text: string, mask: string, invert: boolean = false): { public: string, private: string } {
        if (invert) {
            text = text.split('').reverse().join('');
            mask = mask.split('').reverse().join('');
        }

        text = text.replace(/ /g, "");
        let textIndex = 0;
        let maskIndex = 0;
        let textChar = "";
        let maskChar = "";

        let result = {
            public: "",
            private: "",
        };

        while (maskIndex < mask.length) {
            if (text[textIndex] === undefined || mask[maskIndex] === undefined) break;
            maskChar = mask[maskIndex];
            textChar = text[textIndex];

            if (maskChar === "*") {
                result.public += textChar;
                result.private += textChar;
                textIndex++;
            } else if (maskChar === "0") {
                if (textChar.match(/[0-9]/)) {
                    result.public += textChar;
                    result.private += textChar;
                    textIndex++;
                } else {
                    result.public += maskChar;
                    result.private += maskChar;
                }
            } else if (maskChar === "A") {
                if (textChar.match(/[a-zA-Zá-úÁ-Ú]/)) {
                    result.public += textChar;
                    result.private += textChar;
                    textIndex++;
                } else {
                    result.public += maskChar;
                    result.private += maskChar;
                }
            } else if (maskChar === "X") {
                result.public += "*";
                result.private += textChar;
                textIndex++;
            } else {
                result.public += maskChar;
                result.private += maskChar;
            }

            maskIndex++;
        }

        if (invert) {
            result.public = result.public.split('').reverse().join('');
            result.private = result.private.split('').reverse().join('');
        }

        return result;
    },

    /**
     * Crea un objeto URL a partir de un contenido de texto.
     * @param content - El contenido del texto.
     * @param mime - El tipo MIME del contenido (por defecto 'text/plain').
     * @returns Una URL que representa el contenido del texto.
     **/
    blob(content: string, mime: string = 'text/plain'): string {
        return URL.createObjectURL(new Blob([content], { type: mime }));
    },

    /**
     * Descarga un archivo desde una URL.
     * @param filename - El nombre del archivo a descargar.
     * @param url - La URL del archivo a descargar.
     **/
    download(filename: string, url: string): void {
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
    },

    /**
     * Verifica si el dispositivo es móvil.
     * @returns Verdadero si el dispositivo es móvil, falso en caso contrario.
     **/
    isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Phone|Mobile/i.test(navigator.userAgent);
    },

    /**
     * Verifica si el dispositivo es una tableta.
     * @returns Verdadero si el dispositivo es una tableta, falso en caso contrario.
     **/
    getTheme(): string {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}

export default util;