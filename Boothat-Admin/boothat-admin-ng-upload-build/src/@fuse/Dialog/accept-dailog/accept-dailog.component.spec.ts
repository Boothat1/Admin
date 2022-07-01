import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDailogComponent } from './accept-dailog.component';

describe('AcceptDailogComponent', () => {
  let component: AcceptDailogComponent;
  let fixture: ComponentFixture<AcceptDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
