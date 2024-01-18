import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { CourseCardComponent } from './course-card.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<CourseCardComponent> = {
  title: 'Molecules/CourseCardMainPage',
  component: CourseCardComponent,
  tags: ['autodocs'], 
  decorators: [
    moduleMetadata({
      declarations:[ButtonComponent]
    })
  ]
};

export default meta;
type Story = StoryObj<CourseCardComponent>;

export const Default: Story = {
  args: {
    course: {
      name: 'React',
      imageUrl:
        'https://miro.medium.com/v2/resize:fit:1200/1*XOSA6j_mJ3oz6g8MfoHDpg.jpeg',
      description: 'Curso de React desde cero. ¿Qué es? ¿Por qué deberías aprenderlo? ',
      lessons: [],
      techs: [{ id: '1', name: 'React' }],
      rating: [],
      introductionURL: 'https://example.com/introduction',
      instructorId: [{ id: '1', name: 'Midudev' }],
    },
  },
  
};



