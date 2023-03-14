import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategorieComponent } from './manage-categorie.component';

describe('ManageCategorieComponent', () => {
  let component: ManageCategorieComponent;
  let fixture: ComponentFixture<ManageCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
