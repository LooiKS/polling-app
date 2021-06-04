import {Component, OnInit} from '@angular/core';
import {RoutesConstant} from "../../../../constant/routes.constant";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/service/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  routeConstant = RoutesConstant;
  jwtToken: string;
  token = new BehaviorSubject(this.theItem);

  constructor(private router: Router, private authService: AuthService) {
    this.token.next(localStorage.getItem("jwtToken"));
    this.token.subscribe(value => {
      this.jwtToken = value;
      console.log(this.jwtToken);
    })
  }

  ngOnInit(): void {
  }

  navigatePage(route: string[]): void {
    this.router.navigate(route);
  }

  navigateMainPage(): void {
    this.router.navigate([RoutesConstant.LANDING]);
  }

  navigateYourPoll(): void {
    this.router.navigate([RoutesConstant.POLL, RoutesConstant.VIEW]);
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.token = null;
    this.router.navigate(['/']);
  }


  set theItem(value) {
    this.token.next(value); // this will make sure to tell every subscriber about the change.
  }

  get theItem() {
    return localStorage.getItem('theItem');
  }
}
