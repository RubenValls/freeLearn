import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { LoginFormType, SigninFormType } from '../types/formTypes';
import { UserActions } from '../store/user.actions';
import { FormGroup } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { User } from '../types/user';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private store: Store,
    private firestore: Firestore,
    private alertsService: AlertsService,
    private usersService: UsersService
  ) {}

  signInWithEmail(formValue: FormGroup<SigninFormType>) {
    const auth = getAuth();
    const email = formValue.value.email;
    const password = formValue.value.password;
    if (typeof email === 'string' && typeof password === 'string') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.handleUserInfo(formValue, userCredential, false);
        })
        .catch((error) => {
          // User failed to sign in
          // Handle sign in error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }

  loginInWithEmail(formValue: FormGroup<LoginFormType>) {
    const auth = getAuth();
    const email = formValue.value.email;
    const password = formValue.value.password;
    if (typeof email === 'string' && typeof password === 'string') {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.handleUserInfo(formValue, userCredential, true);
        })
        .catch((error) => {
          // User failed to log in
          // Handle log in error
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  }

  signInWithGoogle(formValue: FormGroup<LoginFormType>, isLogin: boolean) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        this.handleUserInfo(formValue, result, isLogin);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUserInfo(
    formValue: FormGroup,
    userCredential: UserCredential,
    isLogin: boolean
  ) {
    const userInfo = {
      authUid: userCredential.user.uid,
      ...userCredential.user.providerData[0],
      rememberMe: formValue.value?.rememberMe
        ? formValue.value.rememberMe
        : false,
      role: 'student',
    };
    this.store.dispatch(UserActions.addUser({ user: userInfo }));
    if (!isLogin) {
      const usersRef = collection(this.firestore, 'users');
      addDoc(usersRef, userInfo);
    } else {
      this.usersService.getUsers().subscribe((users) => {
        const user = users.find(user => user.email === userInfo.email)
        this.usersService.updateUser(user?.id ? user?.id : '', userInfo)
      })
    }
    formValue.reset();
  }
}
