import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserActions } from '../../state/user.actions';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private store: Store){
    this.signupForm = new FormGroup({
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
      const auth = getAuth();
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          const userInfo = {userUid: userCredential.user.uid, ...userCredential.user.providerData[0]}
          this.store.dispatch(UserActions.addUser({user: userInfo}))
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          const errorMessage = error.message;       
        })
        .finally(() => {
          this.signupForm.reset();
        })
    }
  }

  onGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        this.signupForm.reset();
        this.signupForm.markAsUntouched();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
