import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from '../models/storage-keys.model';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(
        private readonly localStorage: LocalStorageService
    ) { }

    public static getHttpParamsFromObject(object: any): HttpParams
    {
        let params: HttpParams = new HttpParams();
        for (const key of Object.keys(object))
        {
            if (object[key])
            {
                params = params.set(key, object[key]);
            }
        }
        return params;
    }

    public searchParams(search?: Record<string, any>): HttpParams {
        if (!search) {
            return new HttpParams();
        }

        const searchParamsObj: { [param: string]: string | number | boolean } = Object.keys(search)
            .reduce((acc, key) => {
                if (Array.isArray(search[key])) {
                    acc[key] = (search[key] as any[]).join(',');
                } else if (search[key]) {
                    acc[key] = search[key];
                }
                return acc;
            }, {} as { [param: string]: string | number | boolean });

        return new HttpParams({ fromObject: searchParamsObj });
    }

    /**
     * @param localStorageKey the key to find data on LocalStorage
     * @returns the saved data on LocalStorage
     */
    public getLocalStorageDataFormatted(localStorageKey: LocalStorageKeys): any {
        const stringData: string = this.localStorage.get(localStorageKey as string);

        if (stringData) {
            try {
                const objectData: string = JSON.parse(stringData);
                return objectData;
            } catch {
                return undefined;
            }
        }
        return undefined;
    }

    public isNumeric(value: string): boolean {
        return /^\d+$/.test(value);
    }
}