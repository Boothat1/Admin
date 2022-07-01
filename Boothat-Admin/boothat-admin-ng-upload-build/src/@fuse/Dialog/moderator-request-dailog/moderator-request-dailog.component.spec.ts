import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorRequestDailogComponent } from './moderator-request-dailog.component';

describe('ModeratorRequestDailogComponent', () => {
  let component: ModeratorRequestDailogComponent;
  let fixture: ComponentFixture<ModeratorRequestDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorRequestDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorRequestDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
