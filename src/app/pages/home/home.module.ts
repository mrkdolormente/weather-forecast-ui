import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeWelcomeComponent } from './home-welcome/home-welcome.component';
import { HomeWeatherComponent } from './home-weather/home-weather.component';
import { HomeLoginPopupComponent } from './home-login-popup/home-login-popup.component';

@NgModule({
  declarations: [HomeComponent, HomeWelcomeComponent, HomeWeatherComponent, HomeLoginPopupComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
