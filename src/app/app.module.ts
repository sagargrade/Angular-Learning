import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { SystComponent } from './syst/syst.component';
import { ProdComponent } from './prod/prod.component';
import { HeaderComponent } from './header/header.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { UserdataService } from './shared/userdata.service';
import { LoggingService } from './shared/logging.service';
import { HomeComponent } from './home/home.component';
import { TestUserComponent } from './test/test-user-list/test-user/test-user.component';
import { TestUserEditComponent } from './test/test-user-list/test-user/test-user-edit/test-user-edit.component';
import { TestUserListComponent } from './test/test-user-list/test-user-list.component';
import { TestUserRegistrationComponent } from './test/test-user-registration/test-user-registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { CanDeactivateGuardService } from './test/test-user-registration/can-deactivate-guard.service';
import { UserResolverService } from './user-resolver.service';
import { ShortenPipe } from './shared/shorten.pipe';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TestComponent,
    SystComponent,
    ProdComponent,
    BasicHighlightDirective,
    TestUserComponent,
    TestUserEditComponent,
    TestUserListComponent,
    TestUserRegistrationComponent,
    PageNotFoundComponent,
    ShortenPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    UserdataService,
    LoggingService,
    AuthService,
    AuthGaurdService,
    CanDeactivateGuardService,
    UserResolverService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
