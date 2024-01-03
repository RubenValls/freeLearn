import type { Meta, StoryObj } from '@storybook/angular';

import { CourseCardComponent } from './course-card.component';

const meta: Meta<CourseCardComponent> = {
  title: 'Components/CourseCard',
  component: CourseCardComponent,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<CourseCardComponent>;

export const Default: Story = {
  args: {
    course: {
      name: 'Example Course',
      imageUrl: 'example.jpg',
      description: 'This is an example course description.',
      lessons: [], 
      techs: [{ id:"1", name: 'Angular' }],
      rating: [],
      introductionURL: "https://example.com/introduction",
      instructorId:[]
    },
  },
};



