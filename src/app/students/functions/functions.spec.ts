import { mostRatedTopic } from './most-rated';
import { Instructor } from "src/app/admins/admins-dashboard/pages/instructors/instructors";
import { randomArray } from './random-array';

describe('mostRatedTopic', () => {
  it('should return the top 3 rated topics', () => {
    const mockData: Instructor[] = [
        { 
          id: '1',
          name: 'Instructor 1',
          socialMedia: {
            web: 'www.example.com',
            youtube: 'www.youtube.com',
            twitter: 'www.twitter.com',
            linkedin: 'www.linkedin.com',
          },
          courses: ['course1', 'course2'],
          imagePath: 'path/to/image',
          rating: [{ userId: 'user1', rating: 5 }, { userId: 'user2', rating: 4 }]
        },
        { 
          id: '2',
          name: 'Instructor 2',
          socialMedia: {
            web: 'www.example2.com',
            youtube: 'www.youtube2.com',
            twitter: 'www.twitter2.com',
            linkedin: 'www.linkedin2.com',
          },
          courses: ['course3', 'course4'],
          imagePath: 'path/to/image2',
          rating: [{ userId: 'user3', rating: 3 }, { userId: 'user4', rating: 2 }]
        },
        { 
          id: '3',
          name: 'Instructor 3',
          socialMedia: {
            web: 'www.example3.com',
            youtube: 'www.youtube3.com',
            twitter: 'www.twitter3.com',
            linkedin: 'www.linkedin3.com',
          },
          courses: ['course5', 'course6'],
          imagePath: 'path/to/image3',
          rating: [{ userId: 'user5', rating: 5 }, { userId: 'user6', rating: 5 }]
        },
      ];

    const result = mostRatedTopic(mockData);

    expect(result.length).toEqual(3);
    expect(result[0].rating).toEqual([{ userId: 'user5', rating: 5 }, { userId: 'user6', rating: 5 }]);
    expect(result[1].rating).toEqual([{ userId: 'user1', rating: 5 }, { userId: 'user2', rating: 4 }]);
    expect(result[2].rating).toEqual([{ userId: 'user3', rating: 3 }, { userId: 'user4', rating: 2 }]);
  });

  it('should return an empty array when there are no instructors', () => {
    const mockData: Instructor[] = [];
    const result = mostRatedTopic(mockData);
    expect(result.length).toEqual(0);
  });

  it('should handle instructors with no ratings', () => {
    const mockData: Instructor[] = [
      { 
        id: '1',
        name: 'Instructor 1',
        socialMedia: {
          web: 'www.example.com',
          youtube: 'www.youtube.com',
          twitter: 'www.twitter.com',
          linkedin: 'www.linkedin.com',
        },
        courses: ['course1', 'course2'],
        imagePath: 'path/to/image',
        rating: []
      },
    ];
    const result = mostRatedTopic(mockData);
    expect(result.length).toEqual(1);
  });
});

describe('randomArray', () => {
  it('should return n random elements from the array', () => {
    const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result = randomArray(mockData, 5);

    expect(result.length).toEqual(5);
    result.forEach((item) => {
      expect(mockData.includes(item)).toBeTrue();
    });
  });

  it('should return an empty array when n is 0', () => {
    const mockData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = randomArray(mockData, 0);
    expect(result.length).toEqual(0);
  });

  it('should return all elements when n is greater than array length', () => {
    const mockData = [1, 2, 3, 4, 5];
    const result = randomArray(mockData, 10);
    expect(result.length).toEqual(5);
    result.forEach((item) => {
      expect(mockData.includes(item)).toBeTrue();
    });
  });
});
