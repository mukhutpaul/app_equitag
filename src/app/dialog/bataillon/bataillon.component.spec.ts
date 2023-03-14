import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BataillonComponent } from './bataillon.component';

describe('BataillonComponent', () => {
  let component: BataillonComponent;
  let fixture: ComponentFixture<BataillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BataillonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BataillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
