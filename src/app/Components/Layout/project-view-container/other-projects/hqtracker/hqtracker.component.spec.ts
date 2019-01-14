import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HqtrackerComponent } from './hqtracker.component';

describe('HqtrackerComponent', () => {
  let component: HqtrackerComponent;
  let fixture: ComponentFixture<HqtrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HqtrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HqtrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
