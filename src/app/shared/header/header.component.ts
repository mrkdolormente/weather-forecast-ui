import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(@Inject(DOCUMENT) private document: Document, public authService: AuthService) {}

  logout(): void {
    this.authService.logout({ returnTo: this.document.location.origin });
  }
}
