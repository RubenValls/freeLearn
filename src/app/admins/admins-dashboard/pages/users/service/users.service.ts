import { Injectable } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';
import { Firestore, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) { }

  getTechnologies(){
    const userRef =  collection(this.firestore, 'users');
    return collectionData(userRef, {idField: 'id'}) as Observable<any[]>;
  }
}
