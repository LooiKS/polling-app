import { Injectable } from '@angular/core';
import { ApiRoutesConstant } from '../../../constant/api-routes.constant';
import { HttpClient } from '@angular/common/http';
import { PollChoiceDto } from '../model/pollChoiceDto.model';
import { Observable } from 'rxjs';
import { VoteDto } from '../model/vote.model';
import { ResponseModel } from '../model/response-model.model';

@Injectable({
  providedIn: 'root',
})
export class PollService {
  readonly baseUrl: string =
    ApiRoutesConstant.BASE_URL + ApiRoutesConstant.POLL;

  constructor(private http: HttpClient) {}

  getAllPolls() {
    return this.http.get<any>(
      ApiRoutesConstant.BASE_URL +
        ApiRoutesConstant.PUBLIC +
        ApiRoutesConstant.POLL,
      {}
    );
  }

  public createPoll(
    pollChoiceDto: PollChoiceDto
  ): Observable<ResponseModel<PollChoiceDto>> {
    return this.http.post<ResponseModel<PollChoiceDto>>(
      this.baseUrl,
      pollChoiceDto
    );
  }

  getUserPoll() {
    return this.http.get<any>(this.baseUrl, {});
  }

  getParticularPoll(pollId: string) {
    return this.http.get<any>(this.baseUrl + ApiRoutesConstant.PARTICULAR, {
      params: { pollId: pollId },
    });
  }

  addVote(voteDto: VoteDto) {
    return this.http.post<VoteDto>(
      this.baseUrl + ApiRoutesConstant.VOTE,
      voteDto
    );
  }
}
