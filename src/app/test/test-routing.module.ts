import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TestUserListComponent } from './test-user-list/test-user-list.component';
import { TestUserEditComponent } from './test-user-list/test-user/test-user-edit/test-user-edit.component';
import { TestUserComponent } from './test-user-list/test-user/test-user.component';
import { CanDeactivateGuardService } from './test-user-registration/can-deactivate-guard.service';
import { TestUserRegistrationComponent } from './test-user-registration/test-user-registration.component';
import { TestComponent } from './test.component';

const routes: Route[] = [
  {
    path: '',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
