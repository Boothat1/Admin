import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantDailogComponent } from './add-plant-dailog.component';

describe('AddPlantDailogComponent', () => {
  let component: AddPlantDailogComponent;
  let fixture: ComponentFixture<AddPlantDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlantDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlantDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
