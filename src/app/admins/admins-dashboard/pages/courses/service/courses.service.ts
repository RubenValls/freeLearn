import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Course, Tech } from '../interface/course';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';
import { Store } from '@ngrx/store';
import { CoursesEffects } from 'src/app/store/courses/courses.effects';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  currentCourse: Course | undefined;


  constructor(
    private firestore: Firestore,
    private techsService: TechService,
    private instructorsService: InstructorsService,
    private store: Store

  ) { }
  async addCourse(course: Course) {
    const coursesRef = collection(this.firestore, 'courses')
    const docRef = await addDoc(coursesRef, course);
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
    const coursesRef = doc(this.firestore, `courses/${id}`);
    const snapshot = await getDoc(coursesRef);
    const data = snapshot.data();
    return data as Course;
  };

  async updateCourse(id: string, course: Course) {
    const coursesRef = doc(this.firestore, "courses", id);
    await this.getCourseById(id).then((currentCourse) => this.currentCourse = currentCourse);

    const Techsequal = JSON.stringify(this.currentCourse!.techs) === JSON.stringify(course.techs);
    const InstructorsEqual = JSON.stringify(this.currentCourse!.instructorId) === JSON.stringify(course.instructorId);


    if (!Techsequal) {
      const { addedIds, deletedIds } = this.findIdsToEdit(this.currentCourse!.techs, course.techs);
      addedIds?.forEach(techId => { this.techsService.updateTechnologyCourses(techId, course.id!); });
      deletedIds?.forEach(techId => { this.techsService.deleteTechnologyCourses(techId, course.id!); });
    }
    if (!InstructorsEqual) {
      console.log("instructors")
      const { addedIds, deletedIds } = this.findIdsToEdit(this.currentCourse!.instructorId, course.instructorId);
      console.log(addedIds, deletedIds, "addedIds, deletedIds")
      addedIds?.forEach(instructorId => { this.instructorsService.updateInstructorsCourses(instructorId, course.id!); });
      deletedIds?.forEach(instructorId => { this.instructorsService.deleteInstructorsCourses(instructorId, course.id!); });
    }

    const courseUpdate = updateDoc(coursesRef, { ...course })

    return courseUpdate;
  };
  private findIdsToEdit(currentTechs: Tech[], updatedTechs: Tech[]): { deletedIds: string[], addedIds: string[] } {
    const currentIds = currentTechs.map(tech => tech.id);
    const updatedIds = updatedTechs.map(tech => tech.id);
    const addedIds = updatedIds.filter(techId => !currentIds.includes(techId));
    const deletedIds = currentIds.filter(techId => !updatedIds.includes(techId));
    return { addedIds, deletedIds };
  };


  deleteCourse(id: string) {
    console.log(id, "delete service")
    const coursesRef = doc(this.firestore, "courses", id);
    return deleteDoc(coursesRef);
  };


}
