import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, updatePassword } from 'firebase/auth';
import { User } from 'src/app/login/types/user';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  resetPassForm: FormGroup;
  hidePassword = true;
  hidePassword2 = true;

  constructor(private fb: FormBuilder) {
    this.resetPassForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  cambiarContrasena() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const newPassword = this.getASecureRandomPassword();

      updatePassword(user, newPassword)
        .then(() => {
          console.log('Contraseña actualizada exitosamente.');
        })
        .catch((error) => {
          console.error('Error al cambiar la contraseña:', error.message);
        });
    } else {
      console.error('No hay usuario autenticado.');
    }
  }

  private getASecureRandomPassword(): string {
    // Implementa la lógica para generar una contraseña segura
    // Esto podría ser una función que devuelve una cadena aleatoria, por ejemplo.
    // Asegúrate de implementar esta función de manera segura en tu aplicación.
    return 'test1230';
  }
}
