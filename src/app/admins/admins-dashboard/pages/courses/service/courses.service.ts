import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Course, Rating, Tech } from '../interface/course';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, first } from 'rxjs';
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  currentCourse: Course | undefined;


  constructor(
    private firestore: Firestore,
    private techsService: TechService,
    private instructorsService: InstructorsService,

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
  }

  getCourses() {
    const coursesRef = collection(this.firestore, 'courses')
    return collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
  }

  async getCourseById(id: string) {
    const coursesRef = doc(this.firestore, `courses/${id}`);
    const snapshot = await getDoc(coursesRef);
    const data = snapshot.data();
    return data as Course;
  }

  async getTopicCourses (courses: string[]){
    const coursesRef = collection(this.firestore, 'courses')
    const courseCollection =  await collectionData(coursesRef, { idField: 'id' }) as Observable<Course[]>;
    let topicCourses: Course[] = [];

    return new Promise<Course[]>((resolve, reject) => {
      courseCollection.pipe(first()).subscribe(coursesFromCollection => {
          topicCourses = coursesFromCollection.filter(course => courses.includes(course.id ? course.id : ''));
          resolve(topicCourses);
      }, error => {
          reject(error);
      });
    });
  }

  

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
      const { addedIds, deletedIds } = this.findIdsToEdit(this.currentCourse!.instructorId, course.instructorId);     
      addedIds?.forEach(instructorId => { this.instructorsService.updateInstructorsCourses(instructorId, course.id!); });
      deletedIds?.forEach(instructorId => { this.instructorsService.deleteInstructorsCourses(instructorId, course.id!); });
    }

    if (this.currentCourse && course && Techsequal && InstructorsEqual) {        

      const sortedCurrentCourse = JSON.parse(JSON.stringify(this.currentCourse, Object.keys(this.currentCourse).sort()));
      const sortedCourse = JSON.parse(JSON.stringify(course, Object.keys(course).sort()));
      const courseEqual = JSON.stringify(sortedCurrentCourse) === JSON.stringify(sortedCourse);

      if (courseEqual ) {
        return Promise.reject({ message: "No changes were made to the course" });
      }
    }

    const courseUpdate = updateDoc(coursesRef, { ...course })
    return courseUpdate;
  }

  findIdsToEdit(currentTechs: Tech[], updatedTechs: Tech[]): { deletedIds: string[], addedIds: string[] } {
    const currentIds = currentTechs.map(tech => tech.id);
    const updatedIds = updatedTechs.map(tech => tech.id);
    const addedIds = updatedIds.filter(techId => !currentIds.includes(techId));
    const deletedIds = currentIds.filter(techId => !updatedIds.includes(techId));
    return { addedIds, deletedIds };
  }

  async updateCourseRating(courseId: string, rating: Rating) {     
    await this.getCourseById(courseId).then((currentCourse) => this.currentCourse = currentCourse);
    const userRatingIndex = this.currentCourse!.rating.findIndex(r => r.userId === rating.userId);

    if (userRatingIndex !== -1) {
      this.currentCourse!.rating[userRatingIndex] = rating;
    } else {
      this.currentCourse!.rating.push(rating);
    } 

    await updateDoc(doc(this.firestore, "courses", courseId), {
      rating: this.currentCourse!.rating
  
    });
    return this.currentCourse;
  }

  async deleteCourse(id: string) {    
    const coursesRef = doc(this.firestore, "courses", id);
    if(coursesRef){
      await this.getCourseById(id).then((currentCourse) => this.currentCourse = currentCourse);
      const techsIds = this.currentCourse!.techs.map(tech => tech.id);
      const instructorsIds = this.currentCourse!.instructorId.map(instructor => instructor.id);
      techsIds.forEach(techId => {
        this.techsService.deleteTechnologyCourses(techId, id);
      });
      instructorsIds.forEach(instructorId => {
        this.instructorsService.deleteInstructorsCourses(instructorId, id);
      });
    }
    return deleteDoc(coursesRef);
  }


}
