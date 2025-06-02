import { LanguageService } from "../services/language.service";

/**
 * The method transforms the date from a string "11042023" or ISO string to a date in string with abbreviated week and month.
 * @param date 11042023 or ISO string
 * @param showWeekday Mon, Tue, Wed...
 * The navigator language parameter will identify the language defined by the user in his browser
 * and will carry out the correct translation for the abbreviation of the week and month.
 */
export function formatDateWithAbbreviatedMonth(date: string | Date, showWeekday: boolean = true, showTime: boolean = false, languageService: LanguageService): string {
    let dateObject: Date = new Date;

    if (typeof date === 'string' && date.includes('T')) {
        dateObject = new Date(date);
    } else if (typeof date === 'string') {
        const day: number = Number(date.slice(0, 2));
        const month: number = Number(date.slice(2, 4)) - 1;
        const year: number = Number(date.slice(4, 8));
        dateObject = new Date(year, month, day);
    } else {
        return '';
    }

    const dayOfMonth: string = dateObject.getUTCDate().toString().padStart(2, "0");
    let monthString: string = dateObject.toLocaleString(languageService.language(), { month: 'short', timeZone: 'UTC' })?.replace('.', '');
    monthString = monthString.charAt(0).toUpperCase() + monthString.slice(1);
    const yearString: string = dateObject.getUTCFullYear().toString().slice(2);

    let formattedDate: string = '';

    if (showWeekday) {
        const dayString: string = dateObject.toLocaleString(languageService.language(), { weekday: 'short', timeZone: 'UTC' });
        const dayOfWeek: string = dayString.charAt(0).toUpperCase() + dayString.slice(1)?.replace('.', '');
        formattedDate = `${dayOfWeek} ${dayOfMonth} ${monthString} ${yearString}`;
    } else {
        formattedDate = `${dayOfMonth} ${monthString} ${yearString}`;
    }

    if (showTime) {
        const hours: string = dateObject.getUTCHours().toString().padStart(2, '0');
        const minutes: string = dateObject.getUTCMinutes().toString().padStart(2, '0');
        formattedDate += ` - ${hours}:${minutes}`;
    }

    return formattedDate;
}

export function dateInISOString(date: Date | string): string | Date {
    return date ? new Date(date)?.toISOString() : new Date();
}

//Returns dates equal to or greater than the current one.
export function maxDateFilter(selectedDate: Date | null): boolean {
    const today: number = new Date().setHours(0, 0, 0, 0);

    if (!selectedDate) {
        return false;
    }

    const day: number = selectedDate.setHours(0, 0, 0, 0);

    return day <= today;
}