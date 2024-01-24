import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, updatePassword } from 'firebase/auth';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  resetPassForm: FormGroup;
  hidePassword = true;
  hidePassword2 = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertMessage: AlertsService
  ) {
    this.resetPassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  cambiarContrasena() {
    if (this.resetPassForm.valid) {
      const auth = getAuth();
      const user = auth.currentUser;
      const newPassword = this.resetPassForm.value.password;
      const confirmPassword = this.resetPassForm.value.confirmPassword;

      if (user) {
        if (newPassword == confirmPassword){
          updatePassword(user, newPassword)
            .then(() => {
              this.alertMessage.successMessage('Password changed succesfully');
              this.router.navigate(['/students/settings/profile']);
            })
            .catch((error) => {
              if (
                error.message == 'Firebase: Error (auth/requires-recent-login).'
              ) {
                this.alertMessage.errorMessage(
                  'You have to log in again to change password'
                );
              }
              console.error('Error change password:', error.message);
            });
          }else{
            this.alertMessage.errorMessage("Passwords no match")
          }
      } else {
        console.error('No auth user.');
      }
    }
  }
}
