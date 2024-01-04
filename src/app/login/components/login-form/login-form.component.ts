import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { UserActions } from '../../store/user.actions';
import { LoginFormType } from '../../types/formTypes';
import { LoginService } from '../../login-service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  isGoogleLoading = false;

  constructor(private store: Store, private loginService: LoginService){
    this.loginForm = new FormGroup<LoginFormType>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rememberMe: new FormControl(true),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginService.loginInWithEmail(this.loginForm)
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  onGoogleSubmit() {
    this.isGoogleLoading = true;
    this.loginService.signInWithGoogle(this.loginForm, true);
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
