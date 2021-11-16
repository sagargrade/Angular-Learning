import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProdComponent } from './prod/prod.component';
import { HeaderComponent } from './header/header.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { UserdataService } from './shared/userdata.service';
import { LoggingService } from './shared/logging.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CanDeactivateGuardService } from './test/test-user-registration/can-deactivate-guard.service';
import { UserResolverService } from './user-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { LogInterceptorService } from './shared/log-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProdComponent,
    BasicHighlightDirective,
    PageNotFoundComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    UserdataService,
    LoggingService,
    CanDeactivateGuardService,
    UserResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, // 1
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService, // 2
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
