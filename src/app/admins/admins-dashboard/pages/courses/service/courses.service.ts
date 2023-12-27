import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Course } from '../interface/course';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private firestore: Firestore,
    private techsService: TechService,
    private instructorsService: InstructorsService,
  ) { }
  async addCourse(course: Course) {
    const coursesRef = collection(this.firestore, 'courses')
    const docRef = await addDoc(coursesRef, course); // Espera a que se complete la adición del objeto course a la colección courses
    const techsIds = course.techs.map(tech => tech);
    const instructorsIds = course.instructorId.map(instructor => instructor);

    techsIds.forEach(techId => {
      this.techsService.updateTechnologyCourses(techId.id, docRef.id);
    });
    instructorsIds.forEach(instructorId => {
      this.instructorsService.updateInstructorsCourses(instructorId.id, docRef.id);
    });

    return docRef;
  };
  getCourses() {
    const coursesRef = collection(this.firestore, 'courses')
    return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
  };

  async getCourseById(id: string) {
    const coursesRef = doc(this.firestore, "courses", id);
    return (await getDoc(coursesRef)).data() as Course;
  };

  updateCourse(id: string, course: Course) {
    const coursesRef = doc(this.firestore, "courses", id);
    return updateDoc(coursesRef, { course })
  };

  deleteCourse(id: string) {
    console.log(id, "delete service")
    const coursesRef = doc(this.firestore, "courses", id);
    return deleteDoc(coursesRef);
  };


}
