import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Instructor } from '../instructors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorsService {
  constructor(private firestore: Firestore) { }

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
    const instructorsRef = doc(this.firestore, "instructors", id);
    return (await getDoc(instructorsRef)).data() as Instructor;
  };

  async updateInstructor(id: string, instructor: Instructor) {
    const instructorRef = doc(this.firestore, 'instructors', id);
    const instructorUpdate = await updateDoc(instructorRef, { ...instructor })
    return instructorUpdate
  }

  async updateInstructorsCourses(technologyId: string, courseId: string) {
   
    const instructorRef = doc(this.firestore, 'instructors', technologyId);
    const instructorData = (await getDoc(instructorRef)).data() as Instructor;
    instructorData.courses.push(courseId)
    const instructorUpdated = await updateDoc(instructorRef, {
      courses: instructorData.courses
    });
    return instructorUpdated;
  }

  async deleteInstructorsCourses(technologyId: string, courseId: string) {
   
    const instructorRef = doc(this.firestore, 'instructors', technologyId);
    const instructorData = (await getDoc(instructorRef)).data() as Instructor;
    const courses = instructorData.courses.filter(course => course !== courseId);
    const instructorUpdated = await updateDoc(instructorRef, {
      courses: courses
    });
    return instructorUpdated;
  }

  async deleteInstructor(id: string) {
    const instructorRef = doc(this.firestore, 'instructors', id);
    await deleteDoc(instructorRef);
  }

}
