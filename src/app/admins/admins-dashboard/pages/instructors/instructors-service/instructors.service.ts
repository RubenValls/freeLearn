import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { Instructor } from '../instructors';
import { Observable } from 'rxjs';

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

  getInstructors() {
    const instructorsRef = collection(this.firestore, 'instructors')
    return collectionData(instructorsRef, { idField: 'id' }) as Observable<Instructor[]>;
  };

  async getInstructorById(id: string) {  
    const instructorsRef = doc(this.firestore, "instructors",id);    
    return   (await getDoc(instructorsRef)).data() as Instructor;
  };    

}
