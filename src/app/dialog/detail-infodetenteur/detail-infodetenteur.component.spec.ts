import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfodetenteurComponent } from './detail-infodetenteur.component';

describe('DetailInfodetenteurComponent', () => {
  let component: DetailInfodetenteurComponent;
  let fixture: ComponentFixture<DetailInfodetenteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailInfodetenteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailInfodetenteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
