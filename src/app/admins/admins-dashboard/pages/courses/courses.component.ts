import { Component, OnInit } from '@angular/core';
import { CoursesService } from './service/courses.service';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Course } from './interface/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent  {
  watchForm: boolean = false;
  courses$ = this.store.select(selectCourses);
  
  modalWith: string = '1034';
  modalHeight: string = '650px';
  modalTitle: string = 'Courses';

  tableColumns = [
    { prop: 'name', title: 'Name' },   
    { prop: 'imageUrl', title: 'Image' },
    { prop: 'techs', title: 'Technologies' },
    { prop: 'instructorId', title: 'Instructor' },
    { prop: 'introductionURL', title: 'Introduction' },
    { prop: 'lessons', title: 'NºLessons'},
    { prop: 'rating', title: 'Rating'},
  ];

  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Image', prop: 'imageUrl' },
    { label: 'Technologies', prop: 'techs'},
    { label: 'Instructor', prop: 'instructorId' },
    { label: 'Introduction', prop: 'introductionURL' },    
    { label: 'Lessons', prop: 'lessons'},    
  ]  

  constructor(
    private store: Store,
    private coursesService: CoursesService,
    private alertMessages: AlertsService,
  ) { } 


  addCourse() {
    this.watchForm = !this.watchForm;
  }

  onEdit(element:Course, editReferece: boolean = false) {
    this.coursesService.updateCourse(element.id!, element, editReferece)
    .then((data) => {
      this.alertMessages.successMessage('Course update successfully');
    })
    .catch((error) => {
      this.alertMessages.errorMessage('Error updating Course', error.message);
    })
  }

  onDelete(id:string){ 
    this.coursesService.deleteCourse(id)
    .then((data) => {
      this.alertMessages.successMessage('Course delete successfully');
    })
    .catch((error) => {
      this.alertMessages.errorMessage('Error deleting Course', error.message);
    })
  }

}
