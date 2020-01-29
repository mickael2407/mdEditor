import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from '../storage.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private storageService: StorageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err);
            if (err.status === 401) {
                this.authService.isAuth.next(false);
                this.storageService.clearStorage();
                //location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}