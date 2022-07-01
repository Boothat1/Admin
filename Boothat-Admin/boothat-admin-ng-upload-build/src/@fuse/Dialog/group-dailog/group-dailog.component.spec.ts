import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDailogComponent } from './group-dailog.component';

describe('GroupDailogComponent', () => {
  let component: GroupDailogComponent;
  let fixture: ComponentFixture<GroupDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
