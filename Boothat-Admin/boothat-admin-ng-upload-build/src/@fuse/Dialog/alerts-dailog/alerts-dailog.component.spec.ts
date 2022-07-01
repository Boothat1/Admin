import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsDailogComponent } from './alerts-dailog.component';

describe('AlertsDailogComponent', () => {
  let component: AlertsDailogComponent;
  let fixture: ComponentFixture<AlertsDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
