import {Component, OnInit} from '@angular/core';
import {RoutesConstant} from "../../../../constant/routes.constant";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../state/auth.state";
import {ClearAuthState} from "../../state/auth.action";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  routeConstant = RoutesConstant;
  jwtToken: string;

  constructor(private router: Router, private store: Store) {
  }

  ngOnInit(): void {
  }

  navigatePage(route: string[]): void {
    this.router.navigate(route);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.store.dispatch(new ClearAuthState());
    this.router.navigate(['/']);
  }

}
