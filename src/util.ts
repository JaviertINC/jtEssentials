const util = {
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

    blob(content: string, mime: string = 'text/plain'): string {
        return URL.createObjectURL(new Blob([content], { type: mime }));
    },

    download(filename: string, url: string): void {
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        a.remove();
    },

    isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Phone|Mobile/i.test(navigator.userAgent);
    },

    getTheme(): string {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
}

export default util;