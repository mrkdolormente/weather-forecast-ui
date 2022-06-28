import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWeatherComponent } from './user-weather.component';

describe('UserWeatherComponent', () => {
  let component: UserWeatherComponent;
  let fixture: ComponentFixture<UserWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
