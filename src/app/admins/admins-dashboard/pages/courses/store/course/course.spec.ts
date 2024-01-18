import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CourseActions } from './course.actions';
import { courseReducer } from './course.reducer';
import { selectCourse } from './course.selectors';

describe('Course Store', () => {
  let store: Store;
  const mockCourse: Course = { 
    id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
        id: '1',
        name: 'Lesson 1',
        videoUrl: 'https://www.google.com' 
        }],
    rating: [{
        userId: '1',
        rating: 4
  }],
    introductionURL: 'http://example.com/intro'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ course: courseReducer })
      ]
    });

    store = TestBed.inject(Store);
  });

  it('should dispatch Add Course action', () => {
    store.dispatch(CourseActions.addCourse({ course: mockCourse }));

    store.select(selectCourse).subscribe((state) => {
      expect(state).toEqual(mockCourse);
    });
  });

  it('should dispatch Edit Course action', () => {
    const updatedCourse = { ...mockCourse, name: "Updated Course" };
    store.dispatch(CourseActions.editCourse({ course: updatedCourse }));

    store.select(selectCourse).subscribe((state) => {
      expect(state).toEqual(updatedCourse);
    });
  });
});
