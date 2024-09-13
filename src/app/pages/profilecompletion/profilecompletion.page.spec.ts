import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilecompletionPage } from './profilecompletion.page';

describe('ProfilecompletionPage', () => {
  let component: ProfilecompletionPage;
  let fixture: ComponentFixture<ProfilecompletionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecompletionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
