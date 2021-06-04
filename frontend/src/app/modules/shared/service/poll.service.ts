import {Injectable} from "@angular/core";
import {ApiRoutesConstant} from "../../../constant/api-routes.constant";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { PollChoiceDto } from "../model/pollChoiceDto.model";
import { Observable } from "rxjs";
import { ResponseModel } from "../model/response-model.model";

@Injectable({
  providedIn: 'root'
})
export class PollService {
  readonly baseUrl: string = ApiRoutesConstant.BASE_URL + ApiRoutesConstant.POLL;

  constructor(private http: HttpClient, private router: Router) {

  }

  getAllPolls() {
    return this.http.get<any>(this.baseUrl + ApiRoutesConstant.SIGNIN, {});
  }

  public createPoll(pollChoiceDto: PollChoiceDto) :Observable<ResponseModel<PollChoiceDto>>{
    return this.http.post<ResponseModel<PollChoiceDto>>(this.baseUrl, pollChoiceDto);
  }

  getUserPoll() {

  }
}
