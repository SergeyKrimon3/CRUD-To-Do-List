import { APP_INITIALIZER, ApplicationConfig, Injector, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgEventBus } from 'ng-event-bus';
import { TranslationConstants } from './shared/services/translation.service';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateService, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ApplicationInitializerFactory } from './translation.initializer';
import { MAT_DATE_LOCALE } from '@angular/material/core';

export function LangHttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

const defaultLanguage: 'en' | 'pt-br' = window.navigator.language.match('en') ? 'en' : 'pt-br';

export const appConfig: ApplicationConfig = {
    providers: [
        NgEventBus,
        TranslationConstants,
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideTranslateService({
            loader: {
                provide: TranslateLoader,
                useFactory: LangHttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: defaultLanguage
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: ApplicationInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true
        },
        {
            provide: MAT_DATE_LOCALE, 
            useValue: defaultLanguage
        }
    ]
};