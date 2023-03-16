import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetenteurEquipementComponent } from './detenteur-equipement.component';

describe('DetenteurEquipementComponent', () => {
  let component: DetenteurEquipementComponent;
  let fixture: ComponentFixture<DetenteurEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetenteurEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetenteurEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
