import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NgrokSkipInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            setHeaders: {
                'ngrok-skip-browser-warning': '1231'
            }
        });

        return next.handle(modifiedReq);
    }
}