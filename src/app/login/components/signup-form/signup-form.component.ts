import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {

  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(){
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
      console.log(this.signupForm.value);
      const auth = getAuth();
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          this.signupForm.reset()
        })
        .catch((error) => {
          console.log(error)
          const errorCode = error.code;
          const errorMessage = error.message;       
        });
    }
  }

  onGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        this.signupForm.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
