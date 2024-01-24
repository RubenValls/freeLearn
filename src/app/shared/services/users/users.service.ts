import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/login/store/user.actions';
import { User } from 'src/app/login/types/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: Firestore,
    public store: Store
  ) { }

  addUser(user: any) {
    const usersRef = collection(this.firestore, 'users')
    addDoc(usersRef, user).then((data) => { console.log("creado", data) }).catch((error) => { console.log("error", error) })
  }

  getUsers() {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  saveUserInStorage(rememberMe: boolean, user: User) {
    if (rememberMe) {
      localStorage.setItem('userInfo', JSON.stringify(user))
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    }
  }

  getUserFromStorage() {
    const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  async updateUser(userId: string, user: User) {
    const techRef = doc(this.firestore, 'users', userId);
    await updateDoc(techRef, { ...user })
  }

  async updateFavoriteCourses(courseId: string) {
    let message = '';
    let favorites;
    const userInfo = this.getUserFromStorage();
    const userRef = doc(this.firestore, 'users', userInfo.id);
    const userData = (await getDoc(userRef)).data() as User;
    const courseIdExist = userData?.favorites?.find((course) => course === courseId);

    if (courseIdExist) {
      favorites = userData?.favorites?.filter((course) => course !== courseId);
      message = 'Course removed from favorites'
    } else {
      favorites = userData?.favorites?.concat(courseId);
      message = 'Course add to favorites'
    }
    const userUpdated = await updateDoc(userRef, { ...userData, favorites: favorites })
    this.store.dispatch(UserActions.updateUser({ user: userUpdated }));
    this.saveUserInStorage(userInfo.rememberMe, { ...userInfo, favorites: favorites });
    return Promise.resolve({ message: message })
  }
}
