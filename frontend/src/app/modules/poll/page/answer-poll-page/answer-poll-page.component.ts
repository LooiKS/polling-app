import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {AuthState} from "../../../core/state/auth.state";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {IResponse} from "../../../shared/model/IResponse.model";
import {PollChoiceDto} from "../../../shared/model/pollChoiceDto.model";
import {PollService} from "../../../shared/service/poll.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './answer-poll-page.component.html',
  styleUrls: ['./answer-poll-page.component.scss']
})
export class AnswerPollPageComponent implements OnInit {

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  pollData: PollChoiceDto;
  dataLoading: boolean = false;
  pollId: number;
  optionRadioValue;

  constructor(private pollService: PollService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams) {
      this.pollId = this.route.snapshot.queryParams['pollId'];
      console.log(this.route.snapshot.queryParams['pollId']);
      if (this.pollId) {
        this.getPolls();
      }
    } else {
    }
  }

  getPolls(): void {
    this.dataLoading = true;
    this.pollService.getParticularPoll(this.pollId.toString()).pipe(
      tap((response: IResponse<PollChoiceDto>) => {
        this.pollData = response.data;
        this.dataLoading = false;
        console.log(response.data);

      })
    ).subscribe();
  }

  submitVote(): void {

  }


}
