import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SignUpService {
  requestUrl = 'http://127.0.0.1:8080/auth/register';

  constructor(private http: HttpClient) {}

  registerAccount(request: any) {
    return this.http.post(this.requestUrl, request);
  }
}
