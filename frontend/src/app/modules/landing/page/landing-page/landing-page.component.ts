import { Component, OnInit } from '@angular/core';
import { PollService } from '../../../shared/service/poll.service';
import { PollChoiceDto } from '../../../shared/model/pollChoiceDto.model';
import { tap } from 'rxjs/operators';
import { IResponse } from 'src/app/modules/shared/model/IResponse.model';
import { Router } from '@angular/router';
import { RoutesConstant } from '../../../../constant/routes.constant';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../core/state/auth.state';
import { Observable } from 'rxjs';
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { PollChoiceVoteDto } from 'src/app/modules/shared/model/pollChoiceVoteDto.model';

@Component({
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @SelectSnapshot(AuthState.isAuthenticated) isAuthenticated;

  // pollList: PollChoiceDto[] = [];
  pollList: PollChoiceVoteDto[] = [];
  dataLoading: boolean = false;

  optionRadioValue;

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
      .getAllPolls()
      .pipe(
        tap((response: IResponse<PollChoiceVoteDto[]>) => {
          this.pollList = response.data;
          this.dataLoading = false;
        })
      )
      .subscribe();
  }

  submitVote(pollId: number): void {
    // can safely navigate even not authenticated, bcs it will be checked at AuthGuard.ts
    // if (this.isAuthenticated) {
    this.router.navigate([RoutesConstant.POLL, RoutesConstant.ANSWER], {
      queryParams: { pollId: pollId },
    });
    // }
  }
}
