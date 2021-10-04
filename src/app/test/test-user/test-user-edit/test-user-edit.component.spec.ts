import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserEditComponent } from './test-user-edit.component';

describe('TestUserEditComponent', () => {
  let component: TestUserEditComponent;
  let fixture: ComponentFixture<TestUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestUserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
