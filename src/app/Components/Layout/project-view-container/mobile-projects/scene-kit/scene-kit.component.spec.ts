import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneKitComponent } from './scene-kit.component';

describe('SceneKitComponent', () => {
  let component: SceneKitComponent;
  let fixture: ComponentFixture<SceneKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
