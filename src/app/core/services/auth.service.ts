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
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  login(loginPayload: AuthLoginPayload): Observable<AuthLogin> {
    return this.http.post<AuthLogin>(`${this.apiUrl}/login`, loginPayload);
  }
}
