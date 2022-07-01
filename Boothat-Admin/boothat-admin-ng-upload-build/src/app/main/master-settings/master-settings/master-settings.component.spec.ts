import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSettingsComponent } from './master-settings.component';

describe('MasterSettingsComponent', () => {
  let component: MasterSettingsComponent;
  let fixture: ComponentFixture<MasterSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
