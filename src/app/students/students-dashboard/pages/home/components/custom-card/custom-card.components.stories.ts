import type { Meta, StoryObj } from '@storybook/angular';
import { CustomCardComponent } from './custom-card.component';



//👇 This default export determines where your story goes in the story list
const meta: Meta<CustomCardComponent> = {
    title: "Components/Students/HomeCard",
    component: CustomCardComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CustomCardComponent>;

export const Course: Story = {
  args: {
    data:{
        name: "React",
        imageUrl: "https://miro.medium.com/v2/resize:fit:1200/1*XOSA6j_mJ3oz6g8MfoHDpg.jpeg",
        description: "React",
        lessons: [],
        techs: [{id:"1", name: "React"}],
        rating: [],
        introductionURL: "https://example.com/introduction",
        instructorId: [
            {id:"1", name: "Midudev"}
        ]
    }
  },
};

export const Tech: Story = {
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