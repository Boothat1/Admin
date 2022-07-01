import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupportDialogComponent } from './add-support-dialog.component';

describe('AddSupportDialogComponent', () => {
  let component: AddSupportDialogComponent;
  let fixture: ComponentFixture<AddSupportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSupportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
