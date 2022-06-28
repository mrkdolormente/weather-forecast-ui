import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-welcome',
  templateUrl: './home-welcome.component.html',
  styleUrls: ['./home-welcome.component.scss'],
})
export class HomeWelcomeComponent implements OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(private readonly authService: AuthService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  login(): void {
    this.authService
      .login({
        email: '',
        password: '',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
      });
  }
}
