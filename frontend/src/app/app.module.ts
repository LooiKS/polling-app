import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatePipe, registerLocaleData} from '@angular/common';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import {SharedModule} from './modules/shared/shared.module';
import {CoreModule} from './modules/core/core.module';
import {AccessTokenInterceptor} from './modules/core/interceptor/AccessTokenInterceptor';
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./modules/core/state/auth.state";
import {NgxsStoragePluginModule, StorageOption} from "@ngxs/storage-plugin";
import {environment} from "../environments/environment";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
        AuthState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
    }),
    NgxsSelectSnapshotModule.forRoot(),
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
