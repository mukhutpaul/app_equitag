import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetenteursComponent } from './detenteurs.component';

describe('DetenteursComponent', () => {
  let component: DetenteursComponent;
  let fixture: ComponentFixture<DetenteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetenteursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetenteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
