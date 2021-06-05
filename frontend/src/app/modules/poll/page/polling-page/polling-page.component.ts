import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {IResponse} from "../../../shared/model/IResponse.model";
import {PollChoiceDto} from "../../../shared/model/pollChoiceDto.model";
import {PollService} from "../../../shared/service/poll.service";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../../core/state/auth.state";
import {Observable} from "rxjs";

@Component({
  templateUrl: './polling-page.component.html',
  styleUrls: ['./polling-page.component.scss']
})
export class PollingPageComponent implements OnInit {
  pollList: PollChoiceDto[] = [];
  dataLoading: boolean = false;

  optionRadioValue;

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private pollService: PollService, private router: Router, private store: Store) {

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

}
