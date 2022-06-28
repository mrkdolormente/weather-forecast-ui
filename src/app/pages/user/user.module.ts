import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './user.component';
import { UserWeatherComponent } from './user-weather/user-weather.component';

@NgModule({
  declarations: [UserComponent, UserWeatherComponent],
  imports: [CommonModule, SharedModule, UserRoutingModule],
})
export class UserModule {}
