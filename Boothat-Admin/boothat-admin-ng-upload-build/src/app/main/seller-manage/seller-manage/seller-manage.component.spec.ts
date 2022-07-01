import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerManageComponent } from './seller-manage.component';

describe('SellerManageComponent', () => {
  let component: SellerManageComponent;
  let fixture: ComponentFixture<SellerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
