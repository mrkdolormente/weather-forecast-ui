import { query } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  fromEvent,
  map,
  Subject,
  takeUntil,
} from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { UserInfo } from 'src/app/models/users.interface';
import { WeatherGeoCoordinates } from 'src/app/models/weather.interface';

@Component({
  selector: 'app-home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss'],
})
export class HomeWeatherComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  options: string[] = [];
  searchControl = new FormControl('', Validators.required);

  userInfo?: UserInfo;
  weatherData?: WeatherGeoCoordinates[];
  selectedWeatherOption?: WeatherGeoCoordinates;

  isSearching: boolean = false;

  destroy$ = new Subject();

  get isWeatherRedirectValid() {
    return !this.isSearching && this.searchControl.valid && this.selectedWeatherOption;
  }

  constructor(
    private readonly router: Router,
    private readonly userService: UsersService,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userInfo: UserInfo) => {
          this.userInfo = userInfo;
        },
      });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // Get input value
        map((event: any) => {
          return event.target.value;
        }),
        // Time in milliseconds between key events
        debounceTime(1000),

        // Check if previous query is different from current input
        distinctUntilChanged()

        // Subscription for weather api call
      )
      .subscribe((city: string) => {
        this.isSearching = true;

        this.weatherService
          .getCoordinatesByLocationName(city, 5)
          .pipe(
            takeUntil(this.destroy$),
            finalize(() => {
              this.isSearching = false;
            })
          )
          .subscribe((weatherData: WeatherGeoCoordinates[]) => {
            this.weatherData = weatherData;
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectAutoComplete(weatherInfo: WeatherGeoCoordinates) {
    this.selectedWeatherOption = weatherInfo;
  }

  formatWeatherOption(weatherInfo: WeatherGeoCoordinates) {
    return `${weatherInfo.name}, ${weatherInfo.state}, ${weatherInfo.country}`;
  }

  displayWeather() {
    if (this.isWeatherRedirectValid) {
      this.router.navigate(['/weather'], {
        queryParams: {
          lat: this.selectedWeatherOption?.lat,
          lon: this.selectedWeatherOption?.lon,
        },
      });
    }
  }
}
