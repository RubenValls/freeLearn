import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnologyType } from '../../../technologies/types/technologies';
import { Instructor } from '../../../instructors/instructors';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Store } from '@ngrx/store';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit  {
 @Output() closeForm = new EventEmitter<boolean>();
 instructors$ = this.store.select(selectInstructor);
 techs$ = this.store.select(selectTechnologies);
 instructors: Instructor[] | undefined;
 techs: TechnologyType[] | undefined;

  constructor(
    public coursesService: CoursesService,
    private builder: FormBuilder,  
    private alertMessages: AlertsService,
    private store: Store,
  ) { }
   
  ngOnInit(): void {
   this.instructors$.subscribe((instructors) => {
      this.instructors = [...instructors];
   });
    this.techs$.subscribe((techs) => {
        this.techs = [...techs];
    });
  }

  courseForm: FormGroup = this.builder.group({   
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    introductionURL: ["", [Validators.required]],
    instructorId: [[], [Validators.required]],
    imageUrl: ["", [Validators.required]],
    techs: [[],[Validators.required]],
    lessons: [[]],
    rating: [[]],
  }); 
  
  onSelectionChange(event: any, controlName:string) {
    const selected = event.value as string[];
    this.courseForm.get(controlName)?.setValue(selected);
  }

  addCourse() {
    if(this.courseForm.invalid) return;
    this.coursesService.addCourse(this.courseForm.value)
    this.alertMessages.successMessage("Course created successfully")
    this.courseForm.reset();
    this.closeForm.emit(false);
  }

}
