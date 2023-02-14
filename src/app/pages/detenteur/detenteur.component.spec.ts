import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetenteurComponent } from './detenteur.component';

describe('DetenteurComponent', () => {
  let component: DetenteurComponent;
  let fixture: ComponentFixture<DetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetenteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
