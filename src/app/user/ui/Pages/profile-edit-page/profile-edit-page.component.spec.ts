import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPageComponent } from './profile-edit-page.component';

describe('ProfileEditPageComponent', () => {
  let component: ProfileEditPageComponent;
  let fixture: ComponentFixture<ProfileEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
