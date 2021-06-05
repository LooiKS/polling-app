import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  jwtToken: string;

  constructor(private router: Router, private message: NzMessageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.jwtToken = localStorage.getItem("jwtToken");
    console.log(this.jwtToken);
    if (this.jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
    }
    console.log(request);
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
}
