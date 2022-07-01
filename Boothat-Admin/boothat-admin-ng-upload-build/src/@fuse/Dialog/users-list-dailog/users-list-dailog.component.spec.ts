import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListDailogComponent } from './users-list-dailog.component';

describe('UsersListDailogComponent', () => {
  let component: UsersListDailogComponent;
  let fixture: ComponentFixture<UsersListDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
