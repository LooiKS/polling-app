import {NgModule} from '@angular/core';

import {SignInRoutingModule} from './sign-in-routing.module';
import {SignInPageComponent} from './page/sign-in-page/sign-in-page.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [SignInPageComponent],
  imports: [
    SharedModule,
    SignInRoutingModule
  ]
})
export class SignInModule {
}
