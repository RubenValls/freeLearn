import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/login/types/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  addUser(user: any){
    const usersRef = collection(this.firestore, 'users')
    addDoc(usersRef, user).then((data) => { console.log("creado", data)}).catch((error) => {console.log("error", error)})
  }

  getUsers(){
    const techRef =  collection(this.firestore, 'users');
    return collectionData(techRef, {idField: 'id'}) as Observable<User[]>;
  }

  saveUserInStorage(rememberMe: boolean, user: User){
    if(rememberMe){
      localStorage.setItem('userInfo', JSON.stringify(user))
    }else{
      sessionStorage.setItem('userInfo', JSON.stringify(user))
    }
  }

  getUserFromStorage(){
    const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  async updateUser(userId: string, user: User){
    const techRef = doc(this.firestore, 'users', userId);
    await updateDoc(techRef, {...user})
  }
}
