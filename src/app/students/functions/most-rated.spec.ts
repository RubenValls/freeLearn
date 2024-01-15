import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";
import { mostRatedTopic } from "./most-rated";

describe('mostRatedTopic', () => {
  it('should return the top three rated topics', () => {
    const mockArray: Instructor[] | Course[] = [
        { 
            id: '1',
            name: 'Course1',
            description: 'Description1',
            instructorId: [{ id: '1', name: 'Instructor1' }],
            imageUrl: 'url1',
            techs: [{ id: '1', name: 'Tech1' }],
            lessons: [{ id: '1', name: 'Lesson1', videoUrl: 'url1' }],
            rating: [{ userId: '1', rating: 3 }],
            introductionURL: 'url1'
          },
          { 
            id: '2',
            name: 'Course2',
            description: 'Description2',
            instructorId: [{ id: '2', name: 'Instructor2' }],
            imageUrl: 'url2',
            techs: [{ id: '2', name: 'Tech2' }],
            lessons: [{ id: '2', name: 'Lesson2', videoUrl: 'url2' }],
            rating: [{ userId: '2', rating: 4 }],
            introductionURL: 'url2'
          },
          { 
            id: '3',
            name: 'Course3',
            description: 'Description3',
            instructorId: [{ id: '3', name: 'Instructor3' }],
            imageUrl: 'url3',
            techs: [{ id: '3', name: 'Tech3' }],
            lessons: [{ id: '3', name: 'Lesson3', videoUrl: 'url3' }],
            rating: [{ userId: '3', rating: 5 }],
            introductionURL: 'url3'
          },
    ];

    const result = mostRatedTopic(mockArray);

    expect(result.length).toEqual(3);
    expect(result[0].name).toEqual('Course3');
    expect(result[1].name).toEqual('Course2');
    expect(result[2].name).toEqual('Course1');
  });
});
