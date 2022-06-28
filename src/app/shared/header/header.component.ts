import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public readonly authService: AuthService, private readonly router: Router) {}

  logout(): void {
    this.authService.removeAuthToken();
    this.router.navigate(['/']);
  }
}
