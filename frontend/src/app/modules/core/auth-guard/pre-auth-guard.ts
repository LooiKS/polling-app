import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthState} from "../state/auth.state";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {RoutesConstant} from "../../../constant/routes.constant";

@Injectable({providedIn: "root"})
export class PreAuthGuard implements CanActivate {

  @SelectSnapshot(AuthState.isAuthenticated) isAuthenticated;

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.isAuthenticated) {
      this.router.navigate([RoutesConstant.POLL]);
      return false;
    } else {
      return true;
    }
  }

}
