import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from '../storage.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService, private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authService.getAuthValue();
        if (currentUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${this.storageService.getToken()}`
                }
            });
        }

        return next.handle(request);
    }

}