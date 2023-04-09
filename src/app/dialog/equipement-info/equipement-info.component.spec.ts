import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementInfoComponent } from './equipement-info.component';

describe('EquipementInfoComponent', () => {
  let component: EquipementInfoComponent;
  let fixture: ComponentFixture<EquipementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
