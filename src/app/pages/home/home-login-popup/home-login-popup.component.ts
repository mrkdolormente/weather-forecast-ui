import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-login-popup',
  templateUrl: './home-login-popup.component.html',
  styleUrls: ['./home-login-popup.component.scss'],
})
export class HomeLoginPopupComponent {
  showPassword: boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  isSubmitting: boolean = false;
  isInvalidCredentials: boolean = false;

  private readonly destroy$ = new Subject();

  /**
   * @description Get the email form control
   * @returns AbscractControl
   */
  get emailFormControl() {
    return this.loginForm.get('email');
  }

  /**
   * @description Get the password form control
   * @returns AbscractControl
   */
  get passwordFormControl() {
    return this.loginForm.get('password');
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<HomeLoginPopupComponent>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.isInvalidCredentials = false;

      this.authService
        .login(this.loginForm.value)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe({
          next: (tokenData) => {
            this.dialogRef.close();
            this.authService.saveAuthToken(tokenData.token);
          },
          error: (err) => {
            this.isInvalidCredentials = true;
          },
        });
    }
  }
}
