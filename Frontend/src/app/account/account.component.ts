import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ThemeService } from '../shared/services/theme.service';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
    selector: 'app-account',
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {
    public isMobile: boolean = false;
    public isMobileSubscription: Subscription = new Subscription();

    constructor(
        public themeService: ThemeService,
        private readonly appService: AppService
    ) {
        this.isMobileSubscription = this.appService.getIsMobile().subscribe(isMobile => {
            this.isMobile = isMobile;
        });
    }

    public ngOnDestroy(): void {
        this.isMobileSubscription?.unsubscribe();
    }
}