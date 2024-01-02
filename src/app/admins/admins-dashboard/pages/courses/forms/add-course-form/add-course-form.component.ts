import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechService } from '../../../technologies/service/tech.service';
import { InstructorsService } from '../../../instructors/instructors-service/instructors.service';
import { Course } from '../../interface/course';
import { TechnologyType } from '../../../technologies/types/technologies';
import { Instructor } from '../../../instructors/instructors';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit, OnDestroy {
 @Output() closeForm = new EventEmitter<boolean>();
 instructors$: Instructor[] = [];
 techs$:TechnologyType[] = [];
 
 techSubscription: Subscription | undefined
 instructorSubscription: Subscription | undefined



  constructor(
    public coursesService: CoursesService,
    private builder: FormBuilder,
    private techsService: TechService,
    private instructorsService: InstructorsService,
    private alertMessages: AlertsService,
  ) { }

  ngOnInit(): void {
    this.techSubscription = this.techsService.getTechnologies().subscribe(techs => {this.techs$ = techs;});
    this.instructorSubscription = this.instructorsService.getInstructors().subscribe(instructor => {this.instructors$ = instructor;});  
  }

  ngOnDestroy(): void {
    this.techSubscription?.unsubscribe();
    this.instructorSubscription?.unsubscribe();
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
 
  onTechsSelectionChange(event: any) {
    const selectedTechs = event.value as any[];
    this.courseForm.get('techs')?.setValue(selectedTechs);
  }

  onInstructorSelectionChange(event: any) {
    const selectedInstructors = event.value as string[];
    this.courseForm.get('instructorId')?.setValue(selectedInstructors);
  }

  addCourse() {
    if(this.courseForm.invalid) return;
    this.coursesService.addCourse(this.courseForm.value)
    this.alertMessages.successMessage("Course created successfully")
    this.courseForm.reset();
    this.closeForm.emit(false);
  }

}
