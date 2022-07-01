import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusiveBoothComponent } from './exclusive-booth.component';

describe('ExclusiveBoothComponent', () => {
  let component: ExclusiveBoothComponent;
  let fixture: ComponentFixture<ExclusiveBoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusiveBoothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusiveBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
