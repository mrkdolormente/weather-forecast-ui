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

  /**
   * @description Get list of Geo Coordinates by location name
   * @param q City search filter
   * @param limit Response result limit
   * @returns Observable with WeatherGeoCoordinates interface
   */
  getCoordinatesByLocationName(q: string, limit: number = 1): Observable<WeatherGeoCoordinates[]> {
    return this.http.get<WeatherGeoCoordinates[]>(`${environment.weather.apiUrl}/geo/1.0/direct`, {
      params: {
        q,
        limit,
      },
    });
  }

  /**
   * @description Get current weather data using latitude and longitude
   * @param lat City latitude
   * @param lon City longitude
   * @returns Observable with CurrentWeather interface
   */
  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`${environment.weather.apiUrl}/data/2.5/weather`, {
      params: {
        lat,
        lon,
      },
    });
  }
}
