import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {

    public sidebarOpened: boolean = true;
    public menuClickable: boolean = true;
    private sidenav!: MatSidenav;

    public setSidenav(sidenav: MatSidenav): void {
        this.sidenav = sidenav;
    }

    public open(): void {
        this.sidenav.open();
        if (this.sidenav) {
            this.sidebarOpened = true;
            this.sidenav.open();
        }
    }

    public close(): void {
        if (this.sidenav) {
            this.sidebarOpened = false;
            this.sidenav.close();
        }
    }

    public toggle(): void {
        if (this.sidenav) {
            this.sidebarOpened = !this.sidebarOpened;
            this.sidenav.toggle();
        }
    }

    public enableClickMenu(): void {
        this.menuClickable = true;
    }

    public disableClickMenu(): void {
        this.menuClickable = false;
    }
}