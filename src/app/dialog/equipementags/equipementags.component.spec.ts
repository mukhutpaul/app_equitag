import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementagsComponent } from './equipementags.component';

describe('EquipementagsComponent', () => {
  let component: EquipementagsComponent;
  let fixture: ComponentFixture<EquipementagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipementagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
