import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Course } from '../interface/course';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private firestore: Firestore,
  ) { }
  addCourse(course: Course) {
    const coursesRef = collection(this.firestore, 'courses')
    return addDoc(coursesRef, course)
  };
  getCourses(): Observable<Course[]> {
    const coursesRef = collection(this.firestore, 'courses')
    return collectionData(coursesRef) as Observable<Course[]>
  };

  getCourseById(id: Course) {
    const coursesRef = doc(this.firestore, `course/${id}`);
    return getDoc(coursesRef)
  };

  updateCourse(id: string, course: Course) {
    const coursesRef = doc(this.firestore, `course/${id}`);
    return updateDoc(coursesRef, { course })
  };

  deleteCourse(id: string) {
    const coursesRef = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(coursesRef);
  };


}
