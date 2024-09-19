import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallhistoryPage } from './callhistory.page';

describe('CallhistoryPage', () => {
  let component: CallhistoryPage;
  let fixture: ComponentFixture<CallhistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CallhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
