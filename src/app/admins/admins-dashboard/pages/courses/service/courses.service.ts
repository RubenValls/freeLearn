import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Course } from '../interface/course';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from  '@angular/fire/firestore';
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
  getCourses() {
    const coursesRef = collection(this.firestore, 'courses')
    return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
  };

   async getCourseById(id: string) {  
    const coursesRef = doc(this.firestore, "courses",id);    
    return   (await getDoc(coursesRef)).data() as Course;
  };    

  updateCourse(id: string, course: Course) {
    const coursesRef = doc(this.firestore,"courses",id);
    return updateDoc(coursesRef, { course })
  };

  deleteCourse(id: string) {
    const coursesRef = doc(this.firestore, "courses",id);
    return deleteDoc(coursesRef);
  };


}
