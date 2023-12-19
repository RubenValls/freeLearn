import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../service/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.scss']
})
export class AddCourseFormComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private builder: FormBuilder,

  ) { }
  ngOnInit(): void {

  }
  courseForm: FormGroup = this.builder.group({   
    name: ["", [Validators.required]],
    description: ["", [Validators.required]],
    imageUrl: ["", [Validators.required]],
    techs: [[],[Validators.required]],
  });
  onTechsSelectionChange(event: any) {
    const selectedTechs = event.value as string[];
    this.courseForm.get('techs')?.setValue(selectedTechs);
  }

  addCourse() {
    if(this.courseForm.invalid) return;
    this.coursesService.addCourse(this.courseForm.value)
      .then((response) => { alert('Course added successfully') })
      .catch((error) => { console.error(error) });
  }

  getCourses() {
   const c = this.coursesService.getCourses().subscribe((response) => {
     console.log(response);
      this.coursesService.getCourseById(response[4].id!).then(console.log) 
     
    })
 
     
   
  }

}
