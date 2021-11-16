import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestRoutingModule } from './test-routing.module';
import { TestUserListComponent } from './test-user-list/test-user-list.component';
import { TestUserEditComponent } from './test-user-list/test-user/test-user-edit/test-user-edit.component';
import { TestUserComponent } from './test-user-list/test-user/test-user.component';
import { TestUserRegistrationComponent } from './test-user-registration/test-user-registration.component';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    TestComponent,
    TestUserComponent,
    TestUserEditComponent,
    TestUserListComponent,
    TestUserRegistrationComponent,
  ],
  imports: [CommonModule, FormsModule, TestRoutingModule],
})
export class TestModule {}
