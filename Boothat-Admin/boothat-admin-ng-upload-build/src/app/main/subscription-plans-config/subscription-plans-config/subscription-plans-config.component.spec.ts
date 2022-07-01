import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlansConfigComponent } from './subscription-plans-config.component';

describe('SubscriptionPlansConfigComponent', () => {
  let component: SubscriptionPlansConfigComponent;
  let fixture: ComponentFixture<SubscriptionPlansConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPlansConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlansConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
