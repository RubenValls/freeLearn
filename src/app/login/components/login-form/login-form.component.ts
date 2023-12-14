import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const auth = getAuth();
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => {
          // User failed to sign in
          const errorCode = error.code;
          const errorMessage = error.message;
          // Check error code
          if (errorCode === "auth/user-not-found") {
            // User does not exist
            console.log("User not found");
          } else if (errorCode === "auth/wrong-password") {
            // Password is incorrect
            console.log("Wrong password");
          } else {
            // Other errors
            console.log(errorMessage);
          }
        });
    }
  }

  onGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        this.loginForm.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
