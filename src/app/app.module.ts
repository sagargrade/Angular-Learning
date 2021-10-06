import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, //localhost:4200
  {
    path: 'test',
    component: TestComponent,
    children: [
      { path: 'register', component: TestUserRegistrationComponent },
      {
        path: 'users',
        component: TestUserListComponent,
        children: [
          { path: ':name', component: TestUserComponent },
          { path: ':name/edit', component: TestUserEditComponent },
        ],
      },
    ],
  },
  { path: 'syst', component: SystComponent }, //locathost:4200/syst
  { path: 'prod', component: ProdComponent }, //localhost:4200/prod
];

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
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [UserdataService, LoggingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
