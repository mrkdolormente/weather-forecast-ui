import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWeatherComponent } from './user-weather/user-weather.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'weather',
    component: UserWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
