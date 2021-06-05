import {Injectable} from "@angular/core";
import {ApiRoutesConstant} from "../../../constant/api-routes.constant";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {RoutesConstant} from "../../../constant/routes.constant";
import {SignUpModel} from "../model/sign-up.model";
import {UserModel} from "../model/user.model";
import {Store} from "@ngxs/store";
import {SetJWTToken} from "../../core/state/auth.action";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseUrl: string = ApiRoutesConstant.BASE_URL + ApiRoutesConstant.AUTH;

  constructor(private http: HttpClient, private router: Router, private store: Store) {

  }

  login(userInfo: UserModel) {
    return this.http.post<any>(this.baseUrl + ApiRoutesConstant.LOGIN, userInfo, {}).pipe(
      tap(res => {
        if (res.status === 'success') {
          localStorage.setItem('jwtToken', res.data.token);
          sessionStorage.setItem('jwtToken', res.data.token);
          this.store.dispatch(new SetJWTToken(res.data.token));
        }
      }),
      tap(res => {
        if (res.status === 'success') {
          this.router.navigate([RoutesConstant.POLL]).then();
        }
      })
    )
  }

  signUp(signUpModel: SignUpModel) {
    return this.http.post<any>(this.baseUrl + ApiRoutesConstant.SIGNUP, signUpModel);
  }

}
