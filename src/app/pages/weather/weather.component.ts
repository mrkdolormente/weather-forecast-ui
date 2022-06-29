import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/models/weather.interface';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  currentWeather$?: Observable<CurrentWeather>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { lat, lon } = params;

      if (lat && lon) {
        this.currentWeather$ = this.weatherService.getCurrentWeather(lat, lon).pipe(
          map((response) => {
            const defaultDate = new Date(0);
            defaultDate.setUTCSeconds(response.dt);

            return {
              ...response,
              calculation_date: defaultDate,
            };
          })
        );
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
