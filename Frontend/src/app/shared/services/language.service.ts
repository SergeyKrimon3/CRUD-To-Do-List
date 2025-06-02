import { computed, effect, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from '../models/storage-keys.model';

export interface ILanguage {
    name: ELanguage;
    icon: string;
}

export enum ELanguage {
    PT_BR = 'pt-br',
    EN = 'en',
    ES = 'es'
}

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    public language = signal<ELanguage>(ELanguage.PT_BR);
    public allLanguages: ILanguage[] = [
        {
            name: ELanguage.PT_BR,
            icon: 'br'
        },
        {
            name: ELanguage.EN,
            icon: 'us'
        },
        {
            name: ELanguage.ES,
            icon: 'es'
        }
    ];
    public selectedLanguage = computed(() => {
        return this.allLanguages.find((language) => language.name === this.language());
    });

    constructor(
        private readonly translate: TranslateService,
        private readonly localStorageService: LocalStorageService,
    ) {
        const initialLanguage: string = this.loadInitialLanguage();
        this.language.set(initialLanguage as ELanguage);
        this.setSystemLanguage;
    }

    private loadInitialLanguage(): string {
        const getLanguageFromStorage: string = this.localStorageService.get(LocalStorageKeys.LANGUAGE) as ELanguage;
        return getLanguageFromStorage;
    }

    public getAllLanguages(): ILanguage[] {
        return this.allLanguages;
    }

    public setLanguage(language: ELanguage): void {
        this.language.set(language);
        this.localStorageService.set(LocalStorageKeys.LANGUAGE, language);
    }

    public setSystemLanguage = effect(() => {
        this.translate.use(this.language());
    });
}