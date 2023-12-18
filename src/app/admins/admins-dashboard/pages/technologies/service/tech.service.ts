import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class TechService {

  constructor(private firestore: Firestore) { }

  addTechnology(technology: any){
    const usersRef = collection(this.firestore, 'technologies')
    addDoc(usersRef, technology).then((data) => { console.log("creado", data)}).catch((error) => {console.log("error", error)})
  }
}
