import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { LoginFormType, SigninFormType } from '../types/formTypes';
import { UserActions } from '../store/user.actions';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private store: Store) { }

  signInWithEmail(formValue: FormGroup<SigninFormType>) {
    const auth = getAuth();
      const email = formValue.value.email;
      const password = formValue.value.password;
      if(typeof email === 'string'  && typeof password === 'string'){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user);
          const userInfo = {
            userUid: userCredential.user.uid, 
            ...userCredential.user.providerData[0],
            rememberMe: false,
            role: 'student',
          }
          this.store.dispatch(UserActions.addUser({user: userInfo}))
        })
        .catch((error) => {
          // User failed to sign in
          // Handle sign in error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)      
        })
      }
  }

  loginInWithEmail(formValue: FormGroup<LoginFormType>) {
    const auth = getAuth();
    const email = formValue.value.email;
    const password = formValue.value.password;
    if(typeof email === 'string'  && typeof password === 'string'){
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
          const userInfo = {
            userUid: userCredential.user.uid, 
            ...userCredential.user.providerData[0],
            rememberMe: formValue.value.rememberMe,
            role: 'student',
          }
          this.store.dispatch(UserActions.addUser({user: userInfo}))
        })
        .catch((error) => {
          // User failed to log in
          // Handle log in error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
  }

  signInWithGoogle(formValue: FormGroup<LoginFormType>) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          userUid: result.user.uid, 
          ...result.user.providerData[0],
          rememberMe: formValue.value?.rememberMe ? formValue.value.rememberMe : false,
          role: 'student',
        }
        this.store.dispatch(UserActions.addUser({user: userInfo}))
        formValue.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

