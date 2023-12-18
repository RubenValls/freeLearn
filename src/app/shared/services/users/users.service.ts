import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  addUser(user: any){
    const usersRef = collection(this.firestore, 'users')
    addDoc(usersRef, user)
  }
}
