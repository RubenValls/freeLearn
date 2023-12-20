import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechService } from '../../../technologies/service/tech.service';
import { InstructorsService } from '../../../instructors/instructors-service/instructors.service';
import { Course } from '../../interface/course';
import { TechnologyType } from '../../../technologies/types/technologies';
import { Instructor } from '../../../instructors/instructors';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {
 instructors$: Instructor[] = [];
 techs$:TechnologyType[] = [];

  constructor(
    private coursesService: CoursesService,
    private builder: FormBuilder,
    private techsService: TechService,
    private instructorsService: InstructorsService,
  ) { }
  ngOnInit(): void {
    this.techsService.getTechnologies().subscribe(techs => {this.techs$ = techs;});
    this.instructorsService.getInstructors().subscribe(instructor => {this.instructors$ = instructor;});  
  }

  courseForm: FormGroup = this.builder.group({   
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    instructorId: [[], [Validators.required]],
    imageUrl: ["", [Validators.required]],
    techs: [[],[Validators.required]],
  });
 
  onTechsSelectionChange(event: any) {
    const selectedTechs = event.value as string[];
    this.courseForm.get('techs')?.setValue(selectedTechs);
  }
  onInstructorSelectionChange(event: any) {
    const selectedInstructors = event.value as string[];
    this.courseForm.get('instructorId')?.setValue(selectedInstructors);
  }

  addCourse() {
    if(this.courseForm.invalid) return;
    this.coursesService.addCourse(this.courseForm.value)
  }

}