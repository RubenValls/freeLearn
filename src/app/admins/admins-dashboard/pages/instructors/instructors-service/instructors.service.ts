import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Instructor } from '../instructors';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  constructor(private firestore: Firestore) {}

  async addInstructor(instructor: Instructor) {
    const instructorsRef = collection(this.firestore, 'instructors');
    const docRef = await addDoc(instructorsRef, instructor);
    return docRef;
  }
}
