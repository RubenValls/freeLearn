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
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private store: Store,
    private firestore: Firestore,
    private alertsService: AlertsService,
    private usersService: UsersService,
    private router: Router
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
          error.message === "Firebase: Error (auth/email-already-in-use)."
          &&
          this.alertsService.errorMessage("Email already exist");
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
          error.message === 'Firebase: Error (auth/invalid-credential).' &&
            this.alertsService.errorMessage('Invalid credentials');
        });
    }
  }

  signInWithGoogle(formValue: FormGroup<LoginFormType>, isLogin: boolean) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        this.handleUserInfo(formValue, result, isLogin);
      })
      .catch((error) => {
        this.alertsService.errorMessage(error.message);
      });
  }

  handleUserInfo(
    formValue: FormGroup,
    userCredential: UserCredential,
    isLogin: boolean
  ) {
    if (!isLogin) {
      const userInfo = this.getUserInfoData(isLogin, formValue, userCredential);
      const usersSubscription = this.usersService
        .getUsers()
        .subscribe((users) => {
          const user = users.find((user) => user.email === userInfo.email);
          if (!user) {
            const usersRef = collection(this.firestore, 'users');
            addDoc(usersRef, userInfo);
          }
          this.saveUserDataAndNavigate(userInfo, usersSubscription);
        });
    } else {
      const userInfo = this.getUserInfoData(isLogin, formValue, userCredential);
      const usersSubscription = this.usersService
        .getUsers()
        .subscribe((users) => {
          let user = users.find((user) => user.email === userInfo.email);
          this.usersService
            .updateUser(user?.id ? user?.id : '', userInfo)
            .then(() => {
              user = users.find((user) => user.email === userInfo.email);
              if (user) {
                this.saveUserDataAndNavigate(user, usersSubscription);
              }
            });
        });
    }
  }

  saveUserDataAndNavigate(userInfo: User, usersSubscription: Subscription) {
    this.store.dispatch(UserActions.addUser({ user: userInfo }));
    this.usersService.saveUserInStorage(userInfo.rememberMe, userInfo);
    usersSubscription.unsubscribe();
    this.router.navigate(['/students']);
    this.alertsService.successMessage('Welcome to FreeLearn.');
  }

  getUserInfoData(
    isLogin: boolean,
    formValue: FormGroup,
    userCredential: UserCredential
  ) {
    if (isLogin) {
      return {
        authUid: userCredential.user.uid,
        rememberMe: formValue.value?.rememberMe
          ? formValue.value.rememberMe
          : false,
        ...userCredential.user.providerData[0],
      };
    } else {
      return {
        authUid: userCredential.user.uid,
        ...userCredential.user.providerData[0],
        rememberMe: formValue.value?.rememberMe
          ? formValue.value.rememberMe
          : false,
        role: 'student',
        favorites: [],
      };
    }
  }
}
