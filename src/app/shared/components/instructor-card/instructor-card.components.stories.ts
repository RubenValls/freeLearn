import type { Meta, StoryObj } from '@storybook/angular';
import { InstructorCardComponent } from './instructor-card.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<InstructorCardComponent> = {
    title: "Components/atoms/Students/InstructorCard",
  component: InstructorCardComponent,
  tags: ['autodoc']
};

export default meta;
type Story = StoryObj<InstructorCardComponent>;

export const Default: Story = {
  args: {
    instructor: {
        id: '1',
        name: 'Midudev',
        rating: [],
        imagePath:
          'https://yt3.googleusercontent.com/ytc/AIf8zZScNwk4VuB2XijvUaEz7Z8Wff_tvBzYaHgOXZZtFQ=s176-c-k-c0x00ffffff-no-rj',
        courses: [],
        socialMedia: {
            linkedin: "https://www.linkedin.com/in/midudev",
            twitter: "https://twitter.com/midudev",
            web: "patreon.com/midudev",
            youtube:"https://www.youtube.com/c/midudev"
        }
      },
  },
};