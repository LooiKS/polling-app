import {Component, OnInit} from '@angular/core';
import {PollService} from "../../../shared/service/poll.service";
import {PollChoiceDto} from "../../../shared/model/pollChoiceDto.model";
import {tap} from "rxjs/operators";
import {IResponse} from 'src/app/modules/shared/model/IResponse.model';
import {Router} from "@angular/router";
import {RoutesConstant} from "../../../../constant/routes.constant";

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  pollList: PollChoiceDto[] = [];
  dataLoading: boolean = false;

  optionRadioValue;

  jwtToken: string;

  constructor(private pollService: PollService, private router: Router) {
    this.jwtToken = localStorage.getItem("jwtToken");
  }

  ngOnInit(): void {
    this.getPolls();
  }

  getPolls(): void {
    this.dataLoading = true;
    this.pollService.getAllPolls().pipe(
      tap((response: IResponse<PollChoiceDto[]>) => {
        this.pollList = response.data;
        this.dataLoading = false;
      })
    ).subscribe();
  }

  submitVote(): void {
    if (this.jwtToken) {

    } else {
      this.router.navigate([RoutesConstant.LOGIN]);
    }
  }


}
