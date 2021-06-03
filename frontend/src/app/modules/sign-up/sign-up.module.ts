import {NgModule} from '@angular/core';

import {SignUpRoutingModule} from './sign-up-routing.module';
import {SignUpPageComponent} from './page/sign-up-page/sign-up-page.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    SharedModule,
    SignUpRoutingModule
  ]
})
export class SignUpModule {
}
