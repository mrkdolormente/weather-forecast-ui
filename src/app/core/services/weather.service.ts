import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather, WeatherGeoCoordinates } from 'src/app/models/weather.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private readonly http: HttpClient) {}

  getCoordinatesByLocationName(q: string, limit: number = 1): Observable<WeatherGeoCoordinates[]> {
    return this.http.get<WeatherGeoCoordinates[]>(`${environment.weather.apiUrl}/geo/1.0/direct`, {
      params: {
        q,
        limit,
      },
    });
  }

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`${environment.weather.apiUrl}/data/2.5/weather`, {
      params: {
        lat,
        lon,
      },
    });
  }
}
