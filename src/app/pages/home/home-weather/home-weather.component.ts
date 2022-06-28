import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UserInfo } from 'src/app/models/users.interface';

@Component({
  selector: 'app-home-weather',
  templateUrl: './home-weather.component.html',
  styleUrls: ['./home-weather.component.scss'],
})
export class HomeWeatherComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  userInfo?: UserInfo;

  constructor(private readonly userService: UsersService) {}

  ngOnInit(): void {
    this.userService
      .getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (userInfo: UserInfo) => {
          this.userInfo = userInfo;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
