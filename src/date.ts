const date = {
    format(date: Date, format: string = 'dd/mm/yyyy H:i:s'): string {
        format = format.toLowerCase();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        if (format.includes('dd')) {
            format = format.replace('dd', day.toString().padStart(2, '0'));
        }
        if (format.includes('mm')) {
            format = format.replace('mm', month.toString().padStart(2, '0'));
        }
        if (format.includes('yyyy')) {
            format = format.replace('yyyy', year.toString());
        }
        if (format.includes('yy')) {
            format = format.replace('yy', year.toString().slice(-2));
        }
        if (format.includes('h')) {
            format = format.replace('h', hours.toString().padStart(2, '0'));
        }
        if (format.includes('i')) {
            format = format.replace('i', minutes.toString().padStart(2, '0'));
        }
        if (format.includes('s')) {
            format = format.replace('s', seconds.toString().padStart(2, '0'));
        }

        return format;
    },

    parseTimezone(date: Date, timezone: string = 'America/Santiago'): Date {
        return new Date(date.toLocaleString('es-CL', { timeZone: timezone }));
    },


    daysBetween(date1: Date, date2: Date): number {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
    },

    time: {
        add(date: Date, hours: number = 0, minutes: number = 0, seconds: number = 0): Date {
            date.setHours(date.getHours() + hours);
            date.setMinutes(date.getMinutes() + minutes);
            date.setSeconds(date.getSeconds() + seconds);
            return date;
        },

        sub(date: Date, hours: number = 0, minutes: number = 0, seconds: number = 0): Date {
            date.setHours(date.getHours() - hours);
            date.setMinutes(date.getMinutes() - minutes);
            date.setSeconds(date.getSeconds() - seconds);
            return date;
        }
    },

    days: {
        add(date: Date, days: number): Date {
            date.setDate(date.getDate() + days);
            return date;
        },

        sub(date: Date, days: number): Date {
            date.setDate(date.getDate() - days);
            return date;
        }
    },

    months: {

        add(date: Date, months: number): Date {
            date.setMonth(date.getMonth() + months);
            return date;
        },

        sub(date: Date, months: number): Date {
            date.setMonth(date.getMonth() - months);
            return date;
        }
    },

    years: {
        add(date: Date, years: number): Date {
            date.setFullYear(date.getFullYear() + years);
            return date;
        },

        sub(date: Date, years: number): Date {
            date.setFullYear(date.getFullYear() - years);
            return date;
        }
    },

    getAge(birthdate: string): { years: number; months: number; days: number } {
        let today = new Date();
        let birthDate = new Date(birthdate);
        return {
            years: today.getFullYear() - birthDate.getFullYear(),
            months: today.getMonth() - birthDate.getMonth(),
            days: today.getDate() - birthDate.getDate(),
        };
    },
}

export default date;