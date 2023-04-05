import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDetenteurComponent } from './detail-detenteur.component';

describe('DetailDetenteurComponent', () => {
  let component: DetailDetenteurComponent;
  let fixture: ComponentFixture<DetailDetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDetenteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
