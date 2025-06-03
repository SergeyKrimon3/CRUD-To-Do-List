import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalStorageService } from 'angular-web-storage';
import { LocalStorageKeys } from './shared/models/storage-keys.model';
import { ThemeService } from './shared/services/theme.service';
import { LanguageService } from './shared/services/language.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export function ApplicationInitializerFactory(
    translate: TranslateService, injector: Injector, localStorageService: LocalStorageService, languageService: LanguageService, themeService: ThemeService) {
    return async () => {
        await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

        translate.addLangs(['en', 'es', 'pt-br']);
        translate.setDefaultLang('pt-br');

        const browserLang: string | undefined = translate.getBrowserLang();

        let langToUse: string = 'pt-br';

        if (browserLang) {
            if (browserLang.startsWith('pt')) {
                langToUse = 'pt-br';
            } else if (browserLang.startsWith('es')) {
                langToUse = 'es';
            } else if (browserLang.startsWith('en')) {
                langToUse = 'en';
            }
        }

        if (!translate.getLangs().includes(langToUse)) {
            langToUse = 'pt-br';
        }

        localStorageService.set(LocalStorageKeys.LANGUAGE, languageService.language());
        localStorageService.set(LocalStorageKeys.THEME_KEY, themeService.colorTheme());

        try {
            await translate.use(langToUse).toPromise();
        } catch (err) {
            console.error(err);
        }
    };
}