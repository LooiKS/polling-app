import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {IResponse} from "../../../shared/model/IResponse.model";
import {PollChoiceDto} from "../../../shared/model/pollChoiceDto.model";
import {PollService} from "../../../shared/service/poll.service";
import {Router} from "@angular/router";
import {RoutesConstant} from "../../../../constant/routes.constant";

@Component({
  templateUrl: './polling-page.component.html',
  styleUrls: ['./polling-page.component.scss']
})
export class PollingPageComponent implements OnInit {
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
    this.pollService.getUserPoll().pipe(
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
