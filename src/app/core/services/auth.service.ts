import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthLogin, AuthLoginPayload } from 'src/app/models/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly tokenName = 'WEATHER_FORECAST_TOKEN';

  private loggedIn = new BehaviorSubject<boolean>(false);

  /**
   * @descritpion Check if user is logged in
   * @return Observable with the interface of boolean
   */
  get isLoggedIn() {
    const hasToken = this.authToken;
    this.loggedIn.next(!!hasToken);

    return this.loggedIn.asObservable();
  }

  /**
   * @description Get auth token
   * @return Auth token string from local storage
   */
  get authToken(): string | null {
    return localStorage.getItem(this.tokenName);
  }

  constructor(private readonly http: HttpClient) {}

  /**
   * @description Request for user login
   * @param loginPayload Body needed for the login request
   * @returns Observable with the interface of AuthLogin
   */
  login(loginPayload: AuthLoginPayload): Observable<AuthLogin> {
    return this.http.post<AuthLogin>(`${this.apiUrl}/login`, loginPayload);
  }

  /**
   * @description Save auth token on the local storage
   * @param token Token string
   */
  saveAuthToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
  }

  /**
   * @descrption Remove auth token from the local storage
   */
  removeAuthToken(): void {
    localStorage.removeItem(this.tokenName);
  }
}
