import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarsPage } from './avatars.page';

describe('AvatarsPage', () => {
  let component: AvatarsPage;
  let fixture: ComponentFixture<AvatarsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
