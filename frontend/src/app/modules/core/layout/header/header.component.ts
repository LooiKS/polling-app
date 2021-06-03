import { Component, OnInit } from '@angular/core';
import {RoutesConstant} from "../../../../constant/routes.constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  routeConstant = RoutesConstant;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigatePage(route:string): void {
    this.router.navigate([route]);
  }

}
