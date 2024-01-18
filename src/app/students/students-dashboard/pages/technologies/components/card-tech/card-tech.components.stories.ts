import type { Meta, StoryObj } from '@storybook/angular';

import { CardTechComponent } from './card-tech.component';

//👇 This default export determines where your story goes in the story list
const meta: Meta<CardTechComponent> = {
  title: 'Atoms/TechCard',
  component: CardTechComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CardTechComponent>;

export const Default: Story = {
  args: {
    tech: {
      id: '1',
      name: 'Python',
      description: 'Python',
      imagePath:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      courses: [],
    },
  },
};
