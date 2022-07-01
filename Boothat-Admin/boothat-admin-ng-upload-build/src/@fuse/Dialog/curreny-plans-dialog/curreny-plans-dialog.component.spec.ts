import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenyPlansDialogComponent } from './curreny-plans-dialog.component';

describe('CurrenyPlansDialogComponent', () => {
  let component: CurrenyPlansDialogComponent;
  let fixture: ComponentFixture<CurrenyPlansDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenyPlansDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenyPlansDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
