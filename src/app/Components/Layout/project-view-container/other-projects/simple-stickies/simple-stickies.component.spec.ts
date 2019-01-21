import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleStickiesComponent } from './simple-stickies.component';

describe('SimpleStickiesComponent', () => {
  let component: SimpleStickiesComponent;
  let fixture: ComponentFixture<SimpleStickiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleStickiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleStickiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
