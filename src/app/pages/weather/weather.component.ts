import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/models/weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  currentWeather$?: Observable<CurrentWeather>;

  private readonly destroy$ = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Get latitude and longitude on the query parameter
      const { lat, lon } = params;

      // Check wether the latitude and longitude parameter exists on the query parameter
      if (lat && lon) {
        this.currentWeather$ = this.weatherService.getCurrentWeather(lat, lon).pipe(
          takeUntil(this.destroy$),
          map((response) => {
            // Convert unix timestamp to full text string
            const defaultDate = new Date(0);
            defaultDate.setUTCSeconds(response.dt);

            return {
              ...response,
              calculation_date: defaultDate,
            };
          })
        );
      } else {
        // Navigate to landing page if latitude and longitude doesn't exists on the query parameter
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
