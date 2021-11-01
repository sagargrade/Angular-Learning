import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './auth-gaurd.service';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProdComponent } from './prod/prod.component';
import { SystComponent } from './syst/syst.component';
import { TestUserListComponent } from './test/test-user-list/test-user-list.component';
import { TestUserEditComponent } from './test/test-user-list/test-user/test-user-edit/test-user-edit.component';
import { TestUserComponent } from './test/test-user-list/test-user/test-user.component';
import { CanDeactivateGuardService } from './test/test-user-registration/can-deactivate-guard.service';
import { TestUserRegistrationComponent } from './test/test-user-registration/test-user-registration.component';
import { TestComponent } from './test/test.component';
import { UserResolverService } from './user-resolver.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent }, //localhost:4200
  {
    path: 'test',
    component: TestComponent,
    children: [
      {
        path: 'register',
        canDeactivate: [CanDeactivateGuardService],
        component: TestUserRegistrationComponent,
      },
      {
        path: 'users',
        component: TestUserListComponent,
        children: [
          {
            path: ':id',
            component: TestUserComponent,
            //resolve: { user: UserResolverService },
          },
          {
            path: ':id/edit',
            component: TestUserEditComponent,
          },
        ],
      },
    ],
  },
  { path: 'syst', component: SystComponent }, //locathost:4200/syst
  { path: 'prod', component: ProdComponent }, //localhost:4200/prod
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
