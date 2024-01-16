import type { Meta, StoryObj } from '@storybook/angular';
import { CustomCardComponent } from './custom-card.component';

const meta: Meta<CustomCardComponent> = {
  title: 'Components/Students/HomeCard',
  component: CustomCardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CustomCardComponent>;

export const Courses: Story = {
  args: {
    data: {
      name: 'React',
      imageUrl:
        'https://miro.medium.com/v2/resize:fit:1200/1*XOSA6j_mJ3oz6g8MfoHDpg.jpeg',
      description: 'React',
      lessons: [],
      techs: [{ id: '1', name: 'React' }],
      rating: [],
      introductionURL: 'https://example.com/introduction',
      instructorId: [{ id: '1', name: 'Midudev' }],
    },
  },
};

export const Techs: Story = {
  args: {
    data: {
      id: '1',
      name: 'Python',
      description: 'Python',
      imagePath:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      courses: [],
    },
  },
};

export const Trainers: Story = {
  args: {
    data: {
      id: '1',
      name: 'Midudev',
      reating: [],
      imagePath:
        'https://yt3.googleusercontent.com/ytc/AIf8zZScNwk4VuB2XijvUaEz7Z8Wff_tvBzYaHgOXZZtFQ=s176-c-k-c0x00ffffff-no-rj',
      courses: [],
      socialMedia: [
        {
          linkedin: 'https://www.linkedin.com/in/midudev',
          twitter: 'https://twitter.com/midudev',
          web: 'https://www.youtube.com/c/midudev',
          youtube: 'https://www.youtube.com/c/midudev',
        },
      ],
    },
  },
};
