import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetenteurEquipementComponent } from './manage-detenteur-equipement.component';

describe('ManageDetenteurEquipementComponent', () => {
  let component: ManageDetenteurEquipementComponent;
  let fixture: ComponentFixture<ManageDetenteurEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDetenteurEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDetenteurEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
