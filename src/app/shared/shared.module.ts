import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatToolbarModule],
  exports: [HeaderComponent, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
})
export class SharedModule {}
