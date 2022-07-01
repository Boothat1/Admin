import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOverviewComponent } from './detail-overview.component';

describe('DetailOverviewComponent', () => {
  let component: DetailOverviewComponent;
  let fixture: ComponentFixture<DetailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
