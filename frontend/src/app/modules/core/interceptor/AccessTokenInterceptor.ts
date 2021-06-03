import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  jwtToken: string;

  constructor() {
    // get session or local storage token
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.resolveToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.resolveToken()}`,
        },
      });
    }

    return next.handle(request);
  }

  resolveToken(): string {
    return this.jwtToken;
  }

}
