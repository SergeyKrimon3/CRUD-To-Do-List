import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouteGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const pageAccessedByReload: boolean = (window.performance.getEntriesByType('navigation').map((nav: any) => nav?.type).includes('reload'));

        if (!this.router.navigated && !pageAccessedByReload) {
            this.router.navigate(['/profile'], { replaceUrl: true });
            return false;
        } else {
            return true;
        }
    }
}