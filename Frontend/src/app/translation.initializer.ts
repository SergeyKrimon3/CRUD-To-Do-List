import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

export function ApplicationInitializerFactory(
    translate: TranslateService, injector: Injector) {
    return async () => {
        await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

        translate.addLangs(['en', 'fr', 'pt-br', 'eninternal', 'pt-brinternal']);
        translate.setDefaultLang('pt-br');

        const browserLang: string | undefined = translate.getBrowserLang();

        if (browserLang && browserLang.match(/pt/)) {
            try {
                await translate.use('pt-br').toPromise();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await translate.use('en').toPromise();
            } catch (err) {
                console.log(err);
            }
        }
    };
}