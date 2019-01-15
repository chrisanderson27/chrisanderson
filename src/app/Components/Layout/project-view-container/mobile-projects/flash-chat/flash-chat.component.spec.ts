import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashChatComponent } from './flash-chat.component';

describe('FlashChatComponent', () => {
  let component: FlashChatComponent;
  let fixture: ComponentFixture<FlashChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
