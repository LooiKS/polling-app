import {Injectable} from "@angular/core";
import {ApiRoutesConstant} from "../../../constant/api-routes.constant";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {RoutesConstant} from "../../../constant/routes.constant";
import {SignUpModel} from "../model/sign-up.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl: string = ApiRoutesConstant.BASE_URL + ApiRoutesConstant.AUTH;

  constructor(private http: HttpClient, private router: Router) {

  }

  login(username, password) {
    return this.http.post<any>(this.baseUrl + ApiRoutesConstant.SIGNIN, {username, password}).pipe(
      tap(res => {
        // const now = new Date();
        // localStorage.setItem('jwtToken', res.data.jwtToken);
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('expiredAt', ((now.getTime() / 1000) + +res.data.expiresIn).toString());
        // localStorage.setItem('userInformation', JSON.stringify(res.data.userInformation));
      }),
      tap(res => {
        if (res.success) {
          this.router.navigate([RoutesConstant.POLL]).then();
        }
      })
    )
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  signUp(signUpModel: SignUpModel) {
    return this.http.post<any>(this.baseUrl + ApiRoutesConstant.SIGNUP, signUpModel);
  }
}
