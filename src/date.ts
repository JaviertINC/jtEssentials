const date = {
    /**
     * Formatea una fecha a un formato específico
     * @param date - La fecha a formatear
     * @param format - El formato deseado (por defecto 'dd/mm/yyyy H:i:s')
     * @returns La fecha formateada como string
     **/
    format(date: Date, format: string = 'dd/mm/yyyy H:i:s'): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const yearShort = year.slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return format.toLowerCase()
            .replace(/yyyy/g, year)
            .replace(/yy/g, yearShort)
            .replace(/dd/g, day)
            .replace(/mm/g, month)
            .replace(/h/g, hours)
            .replace(/i/g, minutes)
            .replace(/s/g, seconds);
    },

    /**
     * Convierte una fecha a la zona horaria especificada
     * @param date - La fecha a convertir
     * @param timezone - La zona horaria a la cual convertir (por defecto 'America/Santiago')
     * @returns La fecha convertida a la zona horaria especificada
     **/
    parseTimezone(date: Date, timezone: string = 'America/Santiago'): Date {
        return new Date(date.toLocaleString('es-CL', { timeZone: timezone }));
    },

    /**
     * Calcula la cantidad de días entre dos fechas
     * @param date1 - Primera fecha
     * @param date2 - Segunda fecha
     * @returns La cantidad de días entre las dos fechas
     **/
    daysBetween(date1: Date, date2: Date): number {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        return Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
    },

    time: {
        /**
         * Suma tiempo a una fecha
         * @param date - La fecha a la cual se le sumará el tiempo
         * @param time - Un objeto con horas, minutos y segundos a sumar
         * @param time.hours - Horas a sumar
         * @param time.minutes - Minutos a sumar
         * @param time.seconds - Segundos a sumar
         * @returns La nueva fecha con el tiempo sumado
         **/
        add(date: Date, time: { hours?: number, minutes?: number, seconds?: number } = {}): Date {
            const { hours = 0, minutes = 0, seconds = 0 } = time;
            date.setHours(date.getHours() + hours);
            date.setMinutes(date.getMinutes() + minutes);
            date.setSeconds(date.getSeconds() + seconds);
            return date;
        },

        /**
         * Resta tiempo a una fecha
         * @param date - La fecha a la cual se le restará el tiempo
         * @param time - Un objeto con horas, minutos y segundos a restar
         * @param time.hours - Horas a restar
         * @param time.minutes - Minutos a restar
         * @param time.seconds - Segundos a restar
         * @returns La nueva fecha con el tiempo restado
         **/
        sub(date: Date, time: { hours?: number, minutes?: number, seconds?: number } = {}): Date {
            const { hours = 0, minutes = 0, seconds = 0 } = time;
            date.setHours(date.getHours() - hours);
            date.setMinutes(date.getMinutes() - minutes);
            date.setSeconds(date.getSeconds() - seconds);
            return date;
        }
    },

    days: {
        /**
         * Suma días a una fecha
         * @param date - La fecha a la cual se le sumarán los días
         * @param days - La cantidad de días a sumar
         * @returns La nueva fecha con los días sumados
         **/
        add(date: Date, days: number): Date {
            const newDate = new Date(date);
            newDate.setUTCDate(newDate.getUTCDate() + days);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        },

        /**
         * Resta días a una fecha
         * @param date - La fecha a la cual se le restarán los días
         * @param days - La cantidad de días a restar
         * @returns La nueva fecha con los días restados
         **/
        sub(date: Date, days: number): Date {
            const newDate = new Date(date);
            newDate.setUTCDate(newDate.getUTCDate() - days);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        }
    },

    months: {

        /**
         * Suma meses a una fecha
         * @param date - La fecha a la cual se le sumarán los meses
         * @param months - La cantidad de meses a sumar
         * @returns La nueva fecha con los meses sumados
         **/
        add(date: Date, months: number): Date {
            const newDate = new Date(date);
            newDate.setUTCMonth(newDate.getUTCMonth() + months);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        },

        /**
         * Resta meses a una fecha
         * @param date - La fecha a la cual se le restarán los meses
         * @param months - La cantidad de meses a restar
         * @returns La nueva fecha con los meses restados
         **/
        sub(date: Date, months: number): Date {
            const newDate = new Date(date);
            newDate.setUTCMonth(newDate.getUTCMonth() - months);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        }
    },

    years: {
        /**
         * Suma años a una fecha
         * @param date - La fecha a la cual se le sumarán los años
         * @param years - La cantidad de años a sumar
         * @returns La nueva fecha con los años sumados
         **/
        add(date: Date, years: number): Date {
            const newDate = new Date(date);
            newDate.setUTCFullYear(newDate.getUTCFullYear() + years);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        },

        /**
         * Resta años a una fecha
         * @param date - La fecha a la cual se le restarán los años
         * @param years - La cantidad de años a restar
         * @returns La nueva fecha con los años restados
         **/
        sub(date: Date, years: number): Date {
            const newDate = new Date(date);
            newDate.setUTCFullYear(newDate.getUTCFullYear() - years);
            newDate.setUTCHours(0, 0, 0, 0);
            return newDate;
        }
    },

    /**
     * Obtiene la edad a partir de una fecha de nacimiento
     * @param birthdate - Fecha de nacimiento en formato 'YYYY-MM-DD'
     * @returns Un objeto con años, meses y días
     **/
    getAge(birthdate: string): { years: number; months: number; days: number } {
        let today = new Date();
        let birthDate = new Date(birthdate);
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();
        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }
        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
            days = Math.floor((today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24));
        }
        return { years, months, days };
    },

    /**
     * Obtiene el nombre del día de la semana en el idioma especificado
     * @param date - La fecha de la cual obtener el día de la semana
     * @param locale - El código de idioma (ej: 'es-ES', 'en-US', 'fr-FR')
     * @returns El nombre del día de la semana en el idioma especificado
     **/
    getDayOfWeek(date: Date, locale: string = 'es-ES'): string {
        // Create a new date object to avoid modifying the original
        const utcDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
        return utcDate.toLocaleDateString(locale, { weekday: 'long' });
    },

    /**
     * Obtiene el nombre del mes en el idioma especificado
     * @param date - La fecha de la cual obtener el mes
     * @param locale - El código de idioma (ej: 'es-ES', 'en-US', 'fr-FR')
     * @returns El nombre del mes en el idioma especificado
     **/
    getMonth(date: Date, locale: string = 'es-ES'): string {
        return date.toLocaleDateString(locale, { month: 'long' });
    }
}

export default date;