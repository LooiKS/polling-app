import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  jwtToken: string;

  constructor() {
    this.jwtToken = localStorage.getItem("jwtToken");
    console.log(this.jwtToken);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
