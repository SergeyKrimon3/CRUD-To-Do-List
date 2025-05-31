import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslationConstants } from './shared/services/translation.service';
import { environment } from '../environment/environment';
import { EPageTitle } from './shared/enums/page-title.enum';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public previousUrl: string = '';
    public userMenuName: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(
        private readonly router: Router,
        private breakpointObserver: BreakpointObserver,
        private readonly translationConstants: TranslationConstants
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const currentUrl: string = event?.url;
                this.setCurrentUrl(currentUrl);
            }
        });
        this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).subscribe(result => {
            this.isMobile.next(result.matches);
        });
    }

    public setCurrentUrl(url: string): void {
        this.previousUrl = this.currentUrl.getValue();
        this.currentUrl.next(url);
    }

    public setUserMenuName(userName: string): void {
        this.userMenuName.next(userName);
    }

    public getUserMenuName(): Observable<string> {
        return this.userMenuName.asObservable();
    }

    public getCurrentUrl(): Observable<string> {
        return this.currentUrl.asObservable();
    }

    public getPreviousUrl(): string {
        return this.previousUrl;
    }

    // Returns if it's mobile size
    public getIsMobile(): Observable<boolean> {
        return this.isMobile.asObservable();
    }

    public getPageTitle(event: NavigationEnd): string {
        const currentUrl: string = event?.url;
        let pageTitle: string = environment.projectName;

        Object.values(EPageTitle).forEach((page) => {
            if (currentUrl?.includes(page)) {
                pageTitle = `${environment.projectName} | ${this.translationConstants.translate(`pageTitle.${page}`)}`;
            }
        });

        return pageTitle;
    }
}