import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsCourseComponent } from './lessons-course.component';
import { StudentsModule } from 'src/app/students/students.module';
import { Lesson } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

describe('LessonsCourseComponent', () => {
  let component: LessonsCourseComponent;
  let fixture: ComponentFixture<LessonsCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsCourseComponent],
      imports: [
        StudentsModule
      ],
    });
    fixture = TestBed.createComponent(LessonsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no lessons on initialization', () => {
    expect(component.lessons).toBeUndefined();
  });

  it('should sanitize video URLs', () => {
    const mockLessons: Lesson[] = [
      { name: 'Test Lesson 1', videoUrl: 'testUrl1' },
      { name: 'Test Lesson 2', videoUrl: 'testUrl2' },
    ];
    component.lessons = mockLessons;
    component.ngOnInit();
    const safeUrl1 = component.panels[0].videoUrl as any;
    const safeUrl2 = component.panels[1].videoUrl as any;
    
    expect(safeUrl1.changingThisBreaksApplicationSecurity).toContain('https://www.youtube.com/embed/testUrl1');
    expect(safeUrl2.changingThisBreaksApplicationSecurity).toContain('https://www.youtube.com/embed/testUrl2');
  });
  

  it('should correctly map lessons to panels', () => {
    const mockLessons: Lesson[] = [
      { name: 'Test Lesson 1', videoUrl: 'testUrl1' },
      { name: 'Test Lesson 2', videoUrl: 'testUrl2' },
    ];
    component.lessons = mockLessons;
    component.ngOnInit();
    expect(component.panels.length).toEqual(2);
    expect(component.panels[0].name).toEqual('Test Lesson 1');
    expect(component.panels[1].name).toEqual('Test Lesson 2');
  });
});

