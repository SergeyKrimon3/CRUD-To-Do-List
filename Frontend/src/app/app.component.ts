import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { NgEventBus } from 'ng-event-bus';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from './app.service';
import { flagIcons, svgIcons } from '../constants/svg-icons.constants';
import { ETheme, ThemeService } from './shared/services/theme.service';
import { SidenavService } from './shared/services/sidenav.service';
import { ELanguage, LanguageService } from './shared/services/language.service';
import { MenuComponent } from './shared/components/menu/menu.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        SharedModule,
        MenuComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {

    @ViewChild('drawer', { static: true }) public sidenav!: MatSidenav;
    public isAccount: boolean = false;
    public isMobile: boolean = false;
    public urlSubscription: Subscription = new Subscription;
    public isMobileSubscription: Subscription = new Subscription;
    public loading: boolean = false;
    public sidenavMode: MatDrawerMode = 'side';
    public sidenavBackdrop: boolean = false;
    public currentUrl: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly iconRegistry: MatIconRegistry,
        private readonly domSanitizer: DomSanitizer,
        public sidenavService: SidenavService,
        private eventBus: NgEventBus,
        private readonly appService: AppService,
        protected themeService: ThemeService,
        protected languageService: LanguageService,
        private readonly renderer2: Renderer2
    ) {
        this.iconRegistry.setDefaultFontSetClass('material-icons-outlined');
        this.registrySvg(svgIcons, 'icons');
        this.registrySvg(flagIcons, 'flags');

        this.isMobileSubscription = this.appService.getIsMobile().subscribe(isMobile => {
            this.isMobile = isMobile;
        });

        this.urlSubscription = this.appService.getCurrentUrl().subscribe(currentUrl => {
            this.currentUrl = currentUrl === '/' || !currentUrl || Object.values(EUrl).some(url => currentUrl.includes(url));
        });
    }

    public ngOnInit(): void {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

            if (evt instanceof NavigationEnd) {
                const pageTitle: string = this.appService.getPageTitle(evt);
                this.renderer2.setProperty(document, 'title', pageTitle || "")
            }

            window.scrollTo(0, 0);
        });
        this.eventBus.on('appBarMenuButtonClickedEvent').subscribe(() => this.sidenav.open());
    }

    public registrySvg(svgList: Array<string>, folder: string): void {
        svgList.forEach((imageName: string) => {
            this.iconRegistry.addSvgIcon(
                imageName,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${folder}/${imageName}.svg`)
            );
        });
    }

    public ngAfterViewInit(): void {
        this.sidenavService.setSidenav(this.sidenav);
    }

    public translateTheme(theme: ETheme): string {
        if (theme === ETheme.LIGHT) {
            return 'theme.light';
        } else if (theme == ETheme.DARK) {
            return 'theme.dark';
        } else {
            return 'theme.system'
        }
    }

    public translateLanguage(language: ELanguage): string {
        if (language === ELanguage.PT_BR) {
            return 'button.pt';
        } else if (language === ELanguage.EN) {
            return 'button.en';
        } else {
            return 'button.es';
        }
    }
}

export enum EUrl {
    ACCOUNT = 'account',
}