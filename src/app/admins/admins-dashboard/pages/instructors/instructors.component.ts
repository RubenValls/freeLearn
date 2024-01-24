import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';
import { InstructorsService } from './instructors-service/instructors.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Instructor } from './instructors';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent implements OnInit{
  showForm: boolean = false;
  instructors$ = this.store.select(selectInstructor);
  modalWith: string = '1034';
  modalHeight: string = '600px';
  modalTitle: string = 'Trainer';
  filteredInstructor: any = [];

  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 100;


  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'NºCourses' },
    { prop: 'rating', title: 'Rating' },
    { prop: 'socialMedia', title: 'SocialMedia' }
  ];
  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Image', prop: 'imagePath' },
    { label: 'Courses', prop: 'courses' },
    { label: 'Rating', prop: 'rating' },
    {
      label: 'SocialMedia', prop: 'socialMedia',
      subFields: [
        { label: 'Web', prop: 'web' },
        { label: 'YouTube', prop: 'youtube' },
        { label: 'Twitter', prop: 'twitter' },
        { label: 'LinkedIn', prop: 'linkedin' },
      ],

    },
  ]

  searchInstructorControl = new FormControl('');

  constructor(
    private store: Store,
    private instructorsService: InstructorsService,
    private alertMessages: AlertsService
  ) {
  }

  ngOnInit(): void {
    this.instructors$.subscribe((instructor) => {
      this.totalItems = instructor.length
      this.filteredInstructor = this.filterInstructor(
        instructor,
        this.searchInstructorControl.value || ''
      );
    });
    this.searchInstructorControl.valueChanges.subscribe((input) => {
      this.instructors$.subscribe((instructor) => {
        this.filteredInstructor = this.filterInstructor(instructor, input || '');
      });
    });
  }

  filterInstructor(array: readonly any[], input: string) {
    return array.filter(
      (item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
        
    );
  }

  
  getInstructors() {
    let startIndex = this.currentPage * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if (this.filteredInstructor.length > 0) {
      return this.filteredInstructor.slice(startIndex, endIndex);
    } else {
      return this.instructors$.pipe(
        map(courses => courses.slice(startIndex, endIndex))
      );
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onEdit(element: Instructor) {
    this.instructorsService.updateInstructor(element.id!, element).then((data) => {
      this.alertMessages.successMessage('Trainer update successfully');
    }).catch((error) => {
      this.alertMessages.errorMessage('Error updating Trainer', error.message);
    })
  }
  async onDelete(id: string) {
    const instructor = this.instructorsService.getInstructorById(id)
    if((await instructor).courses.length == 0){
      this.instructorsService.deleteInstructor(id)
      this.alertMessages.successMessage('Trainer delete successfully');
    }else{
      this.alertMessages.errorMessage("You can't delete it, contains courses")
    }   
  }
 
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getInstructors();
  }

}
