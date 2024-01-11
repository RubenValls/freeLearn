import { Component, Input, OnInit } from '@angular/core';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';

@Component({
  selector: 'app-details-course',
  templateUrl: './details-course.component.html',
  styleUrls: ['./details-course.component.scss']
})
export class DetailsCourseComponent implements OnInit {
  @Input() courseId: any;
  @Input() instructorsId: string[] | undefined;
  @Input() techsId: string[] | undefined;
  instructorsData: any[] = [];
  techsData: any[] = [];

  constructor(
    private trainersService: InstructorsService,
    private techsService: TechService,
  ) { }
  async ngOnInit(): Promise<void> {
    (await this.trainersService.getInstructorByCourseId(this.courseId)).subscribe((data) => {
      this.instructorsData = data;
    });
    (await this.techsService.getTechnologyByCourseId(this.courseId)).subscribe((data) => {
      this.techsData = data;
    });
  
  }


}
