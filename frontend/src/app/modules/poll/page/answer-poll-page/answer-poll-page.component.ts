import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../core/state/auth.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IResponse } from '../../../shared/model/IResponse.model';
import { VoteDto } from '../../../shared/model/vote.model';
import jwt_decode from 'jwt-decode';
import { PollService } from '../../../shared/service/poll.service';
import { ActivatedRoute } from '@angular/router';
import { PollChoiceVoteDto } from 'src/app/modules/shared/model/pollChoiceVoteDto.model';
import { ColorConstant } from 'src/app/constant/color.constant';
import { ChoiceModel } from 'src/app/modules/shared/model/poll.model';

@Component({
  templateUrl: './answer-poll-page.component.html',
  styleUrls: ['./answer-poll-page.component.scss'],
})
export class AnswerPollPageComponent implements OnInit {
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  pollData: PollChoiceVoteDto;
  voteDto: VoteDto;
  dataLoading: boolean = false;
  pollId: number;
  allowedToVote: boolean;
  optionRadioValue;
  username: String;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var token = sessionStorage.getItem('jwtToken');
    var decoded = jwt_decode(token);
    this.username = decoded['jti'];
    if (this.route.snapshot.queryParams) {
      this.pollId = this.route.snapshot.queryParams['pollId'];
      console.log(this.route.snapshot.queryParams['pollId']);
      if (this.pollId) {
        this.getPolls();
      }
    } else {
    }
  }
  getColor(index: number): String {
    return ColorConstant[index];
  }

  getPercentage(index: number): Number {
    let percentage: number =
      (this.pollData.votes.filter(
        (votes) => votes.choiceID === this.pollData.choices[index].id
      ).length /
        this.pollData.votes.length) *
      100;
    if (Number.isNaN(percentage)) {
      return 0;
    } else {
      return percentage;
    }
  }

  format = (percent: number) => `${percent} %`;

  getPolls(): void {
    this.dataLoading = true;
    this.pollService
      .getParticularPoll(this.pollId.toString())
      .pipe(
        tap((response: IResponse<PollChoiceVoteDto>) => {
          this.pollData = response.data;
          this.dataLoading = false;
          this.allowedToVote = this.checkPoll();

          console.log(response.data);
        })
      )
      .subscribe();
  }

  checkPoll(): boolean {
    if (this.pollData.poll.expiryDt < new Date()) {
      return false;
    } else if (
      this.pollData.votes.some((vote) => vote.votedBy === this.username)
    ) {
      return false;
    } else {
      return true;
    }
  }

  getTooltipText(): String {
    if (this.pollData.poll.createdBy.toUpperCase() === this.username) {
      return 'Author of the poll is not allowed to answer.';
    } else if (this.pollData.poll.expiryDt < new Date()) {
      return 'The poll is expired.';
    } else if (
      this.pollData.votes.some((vote) => vote.votedBy === this.username)
    ) {
      return 'You have voted this poll already.';
    }
  }

  submitVote(): void {
    if (this.optionRadioValue != null && this.allowedToVote == true) {
      let voteDto: VoteDto = {
        id: null,
        choiceID: this.optionRadioValue,
        pollID: this.pollId,
        votedBy: null,
        votedDt: null,
      };
      this.pollService.addVote(voteDto).subscribe((response: any) => {
        this.pollData.votes.push(response.data);
        this.allowedToVote = false;
        console.log(response);
      });
    } else {
    }
  }
}
