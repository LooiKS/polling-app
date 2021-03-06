import { NgModule } from '@angular/core';

import { PollRoutingModule } from './poll-routing.module';
import { PollingPageComponent } from './page/polling-page/polling-page.component';
import { CreatePollingComponent } from './page/create-polling/create-polling.component';
import { SharedModule } from '../shared/shared.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { AnswerPollPageComponent } from './page/answer-poll-page/answer-poll-page.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    PollingPageComponent,
    CreatePollingComponent,
    AnswerPollPageComponent,
  ],
  imports: [
    SharedModule,
    PollRoutingModule,
    NzFormModule,
    NzIconModule,
    FormsModule,
    NzGridModule,
    NzDividerModule,
    NzButtonModule,
    NzAlertModule,
    NzProgressModule,
    NzDescriptionsModule,
    NzToolTipModule,
  ],
})
export class PollModule {}
