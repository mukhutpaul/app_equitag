import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipementagsComponent } from './manage-equipementags.component';

describe('ManageEquipementagsComponent', () => {
  let component: ManageEquipementagsComponent;
  let fixture: ComponentFixture<ManageEquipementagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEquipementagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEquipementagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
