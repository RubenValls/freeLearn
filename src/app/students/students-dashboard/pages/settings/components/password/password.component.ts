import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, updatePassword } from 'firebase/auth';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  resetPassForm: FormGroup;
  hidePassword = true;
  hidePassword2 = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPassForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    })
  }

  cambiarContrasena() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const newPassword = this.resetPassForm.value.password;

      updatePassword(user, newPassword)
        .then(() => {
          console.log('Contraseña actualizada exitosamente.');
          this.router.navigate(['/students/settings/profile']);
        })
        .catch((error) => {
          console.error('Error al cambiar la contraseña:', error.message);
        });
    } else {
      console.error('No hay usuario autenticado.');
    }
  }


  
}

