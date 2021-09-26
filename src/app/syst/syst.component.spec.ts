import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystComponent } from './syst.component';

describe('SystComponent', () => {
  let component: SystComponent;
  let fixture: ComponentFixture<SystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
