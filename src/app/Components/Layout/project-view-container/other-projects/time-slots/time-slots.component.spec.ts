import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotsComponent } from './time-slots.component';

describe('TimeSlotsComponent', () => {
  let component: TimeSlotsComponent;
  let fixture: ComponentFixture<TimeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
