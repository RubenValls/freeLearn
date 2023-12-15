import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserActions } from '../../store/user.actions';
import { LoginService } from '../../login-service/login.service';
import { SigninFormType } from '../../types/formTypes';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private store: Store, private loginService: LoginService){
    this.signupForm = new FormGroup<SigninFormType>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, this.passwordMatchValidator()]),
    });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.signupForm) {
        return null;
      }

      const password = this.signupForm.get('password')?.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { notMatching: true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loginService.signInWithEmail(this.signupForm)
    }
  }

  onGoogleSubmit() {
    this.loginService.signInWithGoogle(this.signupForm)
  }
}
