import { computed, effect, Injectable, signal } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from '../models/storage-keys';


export interface ITheme {
    name: ETheme;
    icon: string;
}

export enum ETheme {
    DARK = 'dark',
    LIGHT = 'light'
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public colorTheme = signal<ETheme>(ETheme.LIGHT);
    public allThemes: ITheme[] = [
        {
            name: ETheme.LIGHT,
            icon: 'sun'
        },
        {
            name: ETheme.DARK,
            icon: 'moon'
        }
    ];
    public selectedTheme = computed(() => {
        return this.allThemes.find((theme) => theme.name === this.colorTheme());
    });

    constructor(
        private readonly localStorageService: LocalStorageService,
    ) {
        const initialTheme: ETheme = this.loadInitialTheme();
        this.colorTheme.set(initialTheme);
        this.setSystemTheme;
    }

    private loadInitialTheme(): ETheme {
        const getThemeFromStorage: string = this.localStorageService.get(LocalStorageKeys.THEME_KEY) as ETheme;
        return getThemeFromStorage === ETheme.DARK || getThemeFromStorage === ETheme.LIGHT ? getThemeFromStorage : ETheme.LIGHT;
    }

    public getAllThemes(): ITheme[] {
        return this.allThemes;
    }

    public setTheme(theme: ETheme): void {
        this.colorTheme.set(theme);
        this.setCompanyLogoTheme(theme);
        this.localStorageService.set(LocalStorageKeys.THEME_KEY, theme);
    }

    public setSystemTheme = effect(() => {
        const theme: ETheme = this.colorTheme();
        document.documentElement.classList.remove(ETheme.DARK, ETheme.LIGHT);
        document.documentElement.classList.add(theme);
        document.body.style.colorScheme = theme;
    });

    public setCompanyLogoTheme(theme: ETheme): string {
        if (theme === ETheme.DARK) {
            return 'assets/images/company-name-logo-white.png';
        } else {
            return 'assets/images/company-name-logo.png';
        }
    }
}