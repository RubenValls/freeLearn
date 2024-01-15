import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Course, Lesson } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-lessons-course',
  templateUrl: './lessons-course.component.html',
  styleUrls: ['./lessons-course.component.scss']
})
export class LessonsCourseComponent implements OnInit {
 
  @Input() lessons: Lesson[] | undefined;
  panels: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {    
    this.panels = this.lessons?.map((lesson, index) => {
      const videoUrl = lesson?.videoUrl;
      const sanitizedVideoUrl: SafeResourceUrl | undefined = videoUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoUrl}`) : undefined;

      return {
        position: index + 1,
        name: lesson?.name,
        videoUrl: sanitizedVideoUrl,
      };
    });  
  }
}
