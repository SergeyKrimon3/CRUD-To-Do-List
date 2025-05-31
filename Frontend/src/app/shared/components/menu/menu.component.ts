import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../services/sidenav.service';
import { AppService } from '../../../app.service';
import { NgEventBus } from 'ng-event-bus';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
    public loading: boolean = false;
    public menuItems: Array<MenuItems> = [
        {
            name: 'events',
            icon: 'star',
            url: '/events',
        },
        {
            name: 'terms',
            icon: 'book',
            url: '/terms',
        }
    ];
    
    public logout: { name: string, icon: string } = { name: 'logout', icon: 'logout' };
    public isMobile: boolean = false;
    public isMobileSubscription!: Subscription;
    public userMenuName: string | undefined = '';
    public readonly myMatchOptions: IsActiveMatchOptions = {
        queryParams: 'ignored',
        matrixParams: 'exact',
        paths: 'subset',
        fragment: 'exact',
    };

    constructor(
        private readonly router: Router,
        public sidenavService: SidenavService, // It's public because we need to use in HTML
        public appService: AppService, // It's public because we need to use in HTML
        private eventBus: NgEventBus,
        private readonly changeDetectorRef: ChangeDetectorRef,
        public themeService: ThemeService,
    ) {
        this.appService.getIsMobile().subscribe(isMobile => {
            this.isMobile = isMobile;
        });
    }

    public ngOnInit(): void {
        this.buildMenuItems();
        this.eventBus.cast('appBarMenuButtonClickedEvent');
    }

    public ngAfterViewInit(): void {
        this.appService.getUserMenuName().subscribe(name => {
            if (name) {
                this.userMenuName = name;
            } else {
                // this.userMenuName = this.getStorageUserLoggedData()?.data?.name;
            }
        });
        this.changeDetectorRef.detectChanges();
    }

    public ngOnDestroy(): void {
        this.isMobileSubscription.unsubscribe();
    }

    private buildMenuItems(): void {
    }

    public handleMenuItemClick(item?: MenuItems): void {
        if (!item?.url) {
            return;
        }

        this.router.navigate([item?.url]);

        if (this.isMobile) {
            this.closeMenu();
        }
    }

    public doLogout(): void {
        // this.accountService.logout();

        if (this.isMobile) {
            this.closeMenu();
        }
    }

    public closeMenu(): void {
        this.sidenavService.close();
    }
}

export interface MenuItems {
    name: string | undefined;
    url: string | undefined;
    icon: string;
    disabled?: boolean | undefined;
}