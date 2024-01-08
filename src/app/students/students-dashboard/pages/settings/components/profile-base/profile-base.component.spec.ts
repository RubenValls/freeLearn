import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBaseComponent } from './profile-base.component';

describe('ProfileBaseComponent', () => {
  let component: ProfileBaseComponent;
  let fixture: ComponentFixture<ProfileBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBaseComponent]
    });
    fixture = TestBed.createComponent(ProfileBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
