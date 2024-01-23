import { Component, OnInit } from '@angular/core';
import { CoursesService } from './service/courses.service';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Course } from './interface/course';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  watchForm: boolean = false;
  courses$ = this.store.select(selectCourses);
  filteredCourses: any = [];

  modalWith: string = '1034';
  modalHeight: string = '600px';
  modalTitle: string = 'Courses';

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imageUrl', title: 'Image' },
    { prop: 'techs', title: 'Technologies' },
    { prop: 'instructorId', title: 'Instructor' },
    { prop: 'introductionURL', title: 'Introduction' },
    { prop: 'lessons', title: 'NºLessons' },
    { prop: 'rating', title: 'Rating' },
  ];

  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Description', prop: 'description' },
    { label: 'Image', prop: 'imageUrl' },
    { label: 'Technologies', prop: 'techs' },
    { label: 'Instructor', prop: 'instructorId' },
    { label: 'Introduction', prop: 'introductionURL' },
    { label: 'Lessons', prop: 'lessons' },
    { prop: 'rating', title: 'Rating' },
  ];

  searchCoursesControl = new FormControl('');

  constructor(
    private store: Store,
    private coursesService: CoursesService,
    private alertMessages: AlertsService
  ) {}

  ngOnInit(): void {
    this.courses$.subscribe((courses) => {
      this.filteredCourses = this.filterCourse(
        courses,
        this.searchCoursesControl.value || ''
      );
    });
    this.searchCoursesControl.valueChanges.subscribe((input) => {
      this.courses$.subscribe((courses) => {
        this.filteredCourses = this.filterCourse(courses, input || '');
      });
    });
  }

  filterCourse(array: readonly Course[], input: string) {
    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.techs.some((tech) =>
          tech.name.toLowerCase().includes(input.toLowerCase())
        ) ||
        item.instructorId.some((instructorId) =>
          instructorId.name.toLowerCase().includes(input.toLowerCase())
        )
    );
  }

  getCourses() {
    if (this.filteredCourses.length > 0) {
      console.log(this.filteredCourses);
      return this.filteredCourses;
    } else {
      return this.courses$;
    }
    
  }

  addCourse() {
    this.watchForm = !this.watchForm;
  }

  onEdit(element: Course) {
    this.coursesService
      .updateCourse(element.id!, element)
      .then((data) => {
        this.alertMessages.successMessage('Course update successfully');
      })
      .catch((error) => {
        this.alertMessages.errorMessage(
          'Error updating Course: ',
          error.message
        );
      });
  }

  onDelete(id: string) {
    this.coursesService
      .deleteCourse(id)
      .then((data) => {
        this.alertMessages.successMessage('Course delete successfully');
      })
      .catch((error) => {
        this.alertMessages.errorMessage('Error deleting Course', error.message);
      });
  }
}
