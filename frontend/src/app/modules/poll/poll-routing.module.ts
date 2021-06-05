import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesConstant} from "../../constant/routes.constant";
import {CreatePollingComponent} from "./page/create-polling/create-polling.component";
import {PollingPageComponent} from "./page/polling-page/polling-page.component";
import {AnswerPollPageComponent} from "./page/answer-poll-page/answer-poll-page.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PollingPageComponent
      },
      {
        path: RoutesConstant.CREATE,
        component: CreatePollingComponent
      },
      {
        path: RoutesConstant.ANSWER,
        component: AnswerPollPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule {
}
