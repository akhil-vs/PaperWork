import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerscriptsComponent } from './answerscripts.component';

describe('AnswerscriptsComponent', () => {
  let component: AnswerscriptsComponent;
  let fixture: ComponentFixture<AnswerscriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerscriptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerscriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
