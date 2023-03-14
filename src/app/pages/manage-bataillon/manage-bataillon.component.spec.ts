import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBataillonComponent } from './manage-bataillon.component';

describe('ManageBataillonComponent', () => {
  let component: ManageBataillonComponent;
  let fixture: ComponentFixture<ManageBataillonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBataillonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBataillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
