import {NgModule} from '@angular/core';

import {LandingRoutingModule} from './landing-routing.module';
import {LandingPageComponent} from './page/landing-page/landing-page.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule {
}
