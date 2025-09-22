import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeseroDashboard } from './dashboard';

describe('Dashboard', () => {
  let component: MeseroDashboard;
  let fixture: ComponentFixture<MeseroDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeseroDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeseroDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
