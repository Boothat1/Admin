import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfileDialogComponent } from './change-profile-dialog.component';

describe('ChangeProfileDialogComponent', () => {
  let component: ChangeProfileDialogComponent;
  let fixture: ComponentFixture<ChangeProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
