import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import {SharedModule} from "./modules/shared/shared.module";
import {CoreModule} from './modules/core/core.module';
import {AccessTokenInterceptor} from "./modules/core/interceptor/AccessTokenInterceptor";

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
