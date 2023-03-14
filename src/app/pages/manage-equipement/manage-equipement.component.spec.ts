import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipementComponent } from './manage-equipement.component';

describe('ManageEquipementComponent', () => {
  let component: ManageEquipementComponent;
  let fixture: ComponentFixture<ManageEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
