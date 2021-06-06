import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IResponse } from '../../../shared/model/IResponse.model';
import { PollChoiceDto } from '../../../shared/model/pollChoiceDto.model';
import { PollService } from '../../../shared/service/poll.service';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/state/auth.state';
import { Observable } from 'rxjs';
import { PollChoiceVoteDto } from 'src/app/modules/shared/model/pollChoiceVoteDto.model';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { RoutesConstant } from 'src/app/constant/routes.constant';

@Component({
  templateUrl: './polling-page.component.html',
  styleUrls: ['./polling-page.component.scss'],
})
export class PollingPageComponent implements OnInit {
  pollList: PollChoiceVoteDto[] = [];
  dataLoading: boolean = false;

  optionRadioValue;

  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @SelectSnapshot(AuthState.isAuthenticated) isAuthenticated;
  constructor(
    private pollService: PollService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getPolls();
  }

  getPolls(): void {
    this.dataLoading = true;
    this.pollService
      .getUserPoll()
      .pipe(
        tap((response: IResponse<PollChoiceVoteDto[]>) => {
          this.pollList = response.data;
          this.dataLoading = false;
        })
      )
      .subscribe();
  }

  submitVote(pollId: number): void {
    if (this.isAuthenticated) {
      this.router.navigate([RoutesConstant.POLL, RoutesConstant.ANSWER], {
        queryParams: { pollId: pollId },
      });
    } else {
      this.router.navigate([RoutesConstant.LOGIN]);
    }
  }
}
