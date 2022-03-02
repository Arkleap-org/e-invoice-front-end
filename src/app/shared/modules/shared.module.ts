
// angular common
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TeraDataModule } from './teradata.module';
import { ApiInterceptor } from '../interceptors/api.interceptor';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { LoaderInterceptor } from '../interceptors/loader.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { NotificationMessageService } from '../services/notification.message.service';
import { SecurityService } from '../services/security.service';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { InternetInterceptor } from '../interceptors/internet.interceptor';


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TeraDataModule,
    MatSlideToggleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatDatepickerModule

  ],
  providers: [
    SecurityService,
    NotificationMessageService,
    DatePipe,

    { provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    TeraDataModule,
    TranslateModule,
    DatePipe,
    MatDatepickerModule
  ]
})

export class SharedModule { }
