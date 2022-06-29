import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoginPopupComponent } from './home-login-popup.component';

describe('HomeLoginPopupComponent', () => {
  let component: HomeLoginPopupComponent;
  let fixture: ComponentFixture<HomeLoginPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeLoginPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoginPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
