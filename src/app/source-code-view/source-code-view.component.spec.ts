import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCodeViewComponent } from './source-code-view.component';

describe('SourceCodeViewComponent', () => {
  let component: SourceCodeViewComponent;
  let fixture: ComponentFixture<SourceCodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
