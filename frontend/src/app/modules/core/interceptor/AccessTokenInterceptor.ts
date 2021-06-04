import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  jwtToken: string;

  constructor(private router: Router, private message: NzMessageService) {
    // get session or local storage token
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.resolveToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.resolveToken()}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 || error.status === 401) {
          // redirect to login page
          this.message.error('Your login session is timed out.');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  resolveToken(): string {
    return this.jwtToken;
  }
}
