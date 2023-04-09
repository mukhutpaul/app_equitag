import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailequipComponent } from './info-detailequip.component';

describe('InfoDetailequipComponent', () => {
  let component: InfoDetailequipComponent;
  let fixture: ComponentFixture<InfoDetailequipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDetailequipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDetailequipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
