import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDetenteurComponent } from './manage-detenteur.component';

describe('ManageDetenteurComponent', () => {
  let component: ManageDetenteurComponent;
  let fixture: ComponentFixture<ManageDetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDetenteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
