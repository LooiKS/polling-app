import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../state/auth.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {RoutesConstant} from "../../../constant/routes.constant";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate {

  @SelectSnapshot(AuthState.isAuthenticated) isAuthenticated;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log(route);
    if (this.isAuthenticated) {
      if (route.routeConfig.path.includes(RoutesConstant.POLL)) {
        return true;
      }
    } else {
      if (route.routeConfig.path.includes(RoutesConstant.LOGIN) || route.routeConfig.path.includes(RoutesConstant.REGISTER)) {
        return true;
      }
    }
    this.router.navigate(["/"]);
  }

}
