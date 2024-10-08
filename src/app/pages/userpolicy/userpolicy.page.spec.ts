import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserpolicyPage } from './userpolicy.page';

describe('UserpolicyPage', () => {
  let component: UserpolicyPage;
  let fixture: ComponentFixture<UserpolicyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
