import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [UserdataService, LoggingService, AuthService, AuthGaurdService],
  bootstrap: [AppComponent],
})
export class AppModule {}
