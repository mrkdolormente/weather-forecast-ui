import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/models/users.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {}

  /**
   * @description Get logged in user info
   * @returns Observable with UserInfo interface
   */
  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/my-info`);
  }
}
