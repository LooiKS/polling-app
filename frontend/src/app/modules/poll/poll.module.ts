import {NgModule} from '@angular/core';

import {PollRoutingModule} from './poll-routing.module';
import {PollingPageComponent} from './page/polling-page/polling-page.component';
import {CreatePollingComponent} from './page/create-polling/create-polling.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [PollingPageComponent, CreatePollingComponent],
  imports: [
    SharedModule,
    PollRoutingModule
  ]
})
export class PollModule {
}
