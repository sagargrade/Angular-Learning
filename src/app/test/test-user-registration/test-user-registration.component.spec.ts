import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserRegistrationComponent } from './test-user-registration.component';

describe('TestUserRegistrationComponent', () => {
  let component: TestUserRegistrationComponent;
  let fixture: ComponentFixture<TestUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestUserRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
