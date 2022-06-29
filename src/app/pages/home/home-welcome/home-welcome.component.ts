import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeLoginPopupComponent } from '../home-login-popup/home-login-popup.component';

@Component({
  selector: 'app-home-welcome',
  templateUrl: './home-welcome.component.html',
  styleUrls: ['./home-welcome.component.scss'],
})
export class HomeWelcomeComponent {
  constructor(private readonly dialog: MatDialog) {}

  /**
   * @description Open login popup
   */
  openLoginDialog(): void {
    this.dialog.open(HomeLoginPopupComponent);
  }
}
