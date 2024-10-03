import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdModalPage } from './ad-modal.page';

describe('AdModalPage', () => {
  let component: AdModalPage;
  let fixture: ComponentFixture<AdModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
