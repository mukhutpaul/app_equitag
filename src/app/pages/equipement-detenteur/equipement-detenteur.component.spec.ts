import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementDetenteurComponent } from './equipement-detenteur.component';

describe('EquipementDetenteurComponent', () => {
  let component: EquipementDetenteurComponent;
  let fixture: ComponentFixture<EquipementDetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementDetenteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementDetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
