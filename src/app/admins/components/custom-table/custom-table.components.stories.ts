import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CustomTableComponent } from './custom-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';

//👇 This default export determines where your story goes in the story list
const meta: Meta<CustomTableComponent> = {
  title: 'Components/Admin/CustomTable',
  component: CustomTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatTableModule, MatDialogModule, SharedModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CustomTableComponent>;

export const Courses: Story = {
  args: {
    data: [
      {
        id: '1',
        name: 'Curso Completo de REACT',
        description: 'Description',
        instructorId: [{ id: 'BHb6atXs68TPFuj4GnbP', name: 'JAB' }],
        imageUrl: 'https://i.ytimg.com/vi/VoMyUgI-5NI/maxresdefault.jpg',
        techs: [{ id: '3ZLJDtVSkLGCVMa95S0W', name: 'React' }],
        lessons: [],
        rating: [],
        introductionURL:
          'https://www.youtube.com/watch?v=VoMyUgI-5NI&list=PLRM7PpbqqStKo-NiCuzuYwewZmd9b-EZ9&index=1',
      },
    ],
    displayedColumns: [
      { prop: 'name', title: 'Name' },
      { prop: 'imageUrl', title: 'Image' },
      { prop: 'techs', title: 'Technologies' },
      { prop: 'instructorId', title: 'Instructor' },
      { prop: 'introductionURL', title: 'Introduction' },
      { prop: 'lessons', title: 'NºLessons' },
      { prop: 'rating', title: 'Rating' },
    ],
    rows: [
      { label: 'Id', prop: 'id' },
      { label: 'Name', prop: 'name' },
      { label: 'Image', prop: 'imageUrl' },
      { label: 'Technologies', prop: 'techs' },
      { label: 'Instructor', prop: 'instructorId' },
      { label: 'Introduction', prop: 'introductionURL' },
      { label: 'Lessons', prop: 'lessons' },
    ],
  },
};
export const Technologies: Story = {
  args: {
    data: [
      {
        id: '1',
        name: 'Python',
        description:
          'Python is a high-level, general-purpose programming language that emphasizes code readability and supports multiple programming paradigms. It is dynamically typed, garbage-collected, and has a comprehensive standard library. It was created by Guido van Rossum in 1991 and is widely used for web development, software development, machine learning, and more.',
        imagePath:
          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        courses: ['1', '2', '3'],
      },
    ],
    displayedColumns: [
      { prop: 'name', title: 'Name' },
      { prop: 'imagePath', title: 'Image' },
      { prop: 'courses', title: 'NºCourses' },
      { prop: 'description', title: 'Description' },
    ],
    rows: [
      { label: 'Id', prop: 'id' },
      { label: 'Name', prop: 'name' },
      { label: 'Image', prop: 'imagePath' },
      { label: 'Description', prop: 'description' },
      { label: 'Courses', prop: 'courses' },
    ],
  },
};
export const Trainers: Story = {
  args: {
    data: [
      {
        id: '1',
        name: 'Midudev',
        rating: [
          {
            rating: 4,
            userId: 'HclEUHV8XslaqIYSMatG',
          },
        ],
        imagePath:
          'https://yt3.googleusercontent.com/ytc/AIf8zZScNwk4VuB2XijvUaEz7Z8Wff_tvBzYaHgOXZZtFQ=s176-c-k-c0x00ffffff-no-rj',
        courses: [],
        socialMedia: {
          linkedin: 'https://www.linkedin.com/in/midudev',
          twitter: 'https://twitter.com/midudev',
          web: 'https://www.youtube.com/c/midudev',
          youtube: 'https://www.youtube.com/c/midudev',
        },
      },
    ],
    displayedColumns: [
      { prop: 'name', title: 'Name' },
      { prop: 'imagePath', title: 'Image' },
      { prop: 'courses', title: 'NºCourses' },
      { prop: 'rating', title: 'Rating' },
      { prop: 'socialMedia', title: 'SocialMedia' },
    ],
    rows: [
      { label: 'Id', prop: 'id' },
      { label: 'Name', prop: 'name' },
      { label: 'Image', prop: 'imagePath' },
      { label: 'Courses', prop: 'courses' },
      { label: 'Rating', prop: 'rating' },
      {
        label: 'SocialMedia',
        prop: 'socialMedia',
        subFields: [
          { label: 'Web', prop: 'web' },
          { label: 'YouTube', prop: 'youtube' },
          { label: 'Twitter', prop: 'twitter' },
          { label: 'LinkedIn', prop: 'linkedin' },
        ],
      },
    ],
  },
};

export const Users: Story = {
  args: {
    data: [
      {
        id: '1',
        displayName: 'Ismael Cervera',
        email: 'isma@test.com',
        photoURL:
          'https://th.bing.com/th/id/OIP.ZmXuryOWnCOmdKSGsS3RAwHaHa?rs=1&pid=ImgDetMain',
        favorites: [],
        providerId: 'password',
        phoneNumber: '666888999',
        authUid: 'wefe34jhhxhjs',
        role: 'student',
        uid: 'isma@test.com',
        rememberMe: true,
      },
    ],
    displayedColumns: [
      { prop: 'displayName', title: 'User' },
      { prop: 'photoURL', title: 'Img' },
      { prop: 'email', title: 'Email' },
      { prop: 'phoneNumber', title: 'Phone' },
      { prop: 'role', title: 'Role' },
    ],
    rows: [
      { label: 'Id', prop: 'id' },
      { label: 'User', prop: 'displayName' },
      { label: 'Img', prop: 'photoURL' },
      { label: 'Email', prop: 'email' },
      { label: 'Phone', prop: 'phoneNumber' },
      { label: 'role', prop: 'role' },
    ],
  },
};
