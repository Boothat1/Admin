import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDailogComponent } from './seller-dailog.component';

describe('SellerDailogComponent', () => {
  let component: SellerDailogComponent;
  let fixture: ComponentFixture<SellerDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
