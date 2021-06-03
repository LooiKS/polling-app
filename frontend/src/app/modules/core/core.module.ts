import {NgModule} from '@angular/core';

import {CoreRoutingModule} from './core-routing.module';
import {PublicLayoutComponent} from './layout/public-layout/public-layout.component';
import {HeaderComponent} from './layout/header/header.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [PublicLayoutComponent, HeaderComponent],
  imports: [
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule {
}
