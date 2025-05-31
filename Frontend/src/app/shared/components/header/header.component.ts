import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { Subscription } from 'rxjs';
import { AppService } from '../../../app.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {

    public isMobile: boolean = false;
    public isMobileSubscription!: Subscription;

    constructor(
        public sidenavService: SidenavService,
        private eventBus: NgEventBus,
        private readonly appService: AppService
    ) {
        this.appService.getIsMobile().subscribe(isMobile => {
            this.isMobile = isMobile;
        });
    }

    public openSidenav(): void {
        this.eventBus.cast('appBarMenuButtonClickedEvent');
    }

    public ngOnDestroy(): void {
        this.isMobileSubscription?.unsubscribe();
    }
}