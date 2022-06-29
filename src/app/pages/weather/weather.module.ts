import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WeatherComponent } from './weather.component';

@NgModule({
  declarations: [WeatherComponent],
  imports: [CommonModule, WeatherRoutingModule, SharedModule],
})
export class WeatherModule {}
