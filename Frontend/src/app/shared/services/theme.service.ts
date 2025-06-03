import { computed, effect, Injectable, signal } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from '../models/storage-keys.model';

export interface ITheme {
    name: ETheme;
    icon: string;
}

export enum ETheme {
    DARK = 'dark',
    LIGHT = 'light',
    SYSTEM = 'system'
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public colorTheme = signal<ETheme>(ETheme.SYSTEM);
    public allThemes: ITheme[] = [
        {
            name: ETheme.SYSTEM,
            icon: 'monitor'
        },
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
    private systemPrefersDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

    constructor(
        private readonly localStorageService: LocalStorageService,
    ) {
        const initialTheme: ETheme = this.loadInitialTheme() as ETheme;
        this.colorTheme.set(initialTheme);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            this.systemPrefersDark.set(event.matches);
        });

        effect(() => {
            this.setSystemTheme();
        });
    }

    private loadInitialTheme(): string {
        const getThemeFromStorage: string = this.localStorageService.get(LocalStorageKeys.THEME_KEY) as ETheme;

        if (!Object.values(ETheme).includes(getThemeFromStorage as ETheme)) {
            return ETheme.SYSTEM;
        }

        return getThemeFromStorage;
    }

    public getAllThemes(): ITheme[] {
        return this.allThemes;
    }

    public setTheme(theme: ETheme): void {
        this.colorTheme.set(theme);
        this.localStorageService.set(LocalStorageKeys.THEME_KEY, theme);
    }

    public setSystemTheme(): void {
        document.documentElement.classList.remove(ETheme.DARK, ETheme.LIGHT, ETheme.SYSTEM);
        document.documentElement.classList.add(this.colorTheme());
        document.body.style.colorScheme = this.colorTheme();
    }

    public setCompanyLogoTheme(): string {
        const prefersDark: boolean = this.systemPrefersDark();
        const isDark: boolean = this.colorTheme() === ETheme.DARK || (this.colorTheme() === ETheme.SYSTEM && prefersDark);

        return isDark ? 'assets/images/company-name-logo-white.png' : 'assets/images/company-name-logo.png';
    }
}