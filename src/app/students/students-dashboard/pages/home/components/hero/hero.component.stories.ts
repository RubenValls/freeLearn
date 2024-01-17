import type { Meta, StoryObj } from '@storybook/angular';
import { HeroComponent } from "./hero.component";

const meta: Meta<HeroComponent> = {
    title: 'Components/Students/Hero',
    component: HeroComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HeroComponent>;

export const Courses: Story = {
    args: {
      user: {
        displayName: 'Test User',
        email: 'testuser@example.com',
        phoneNumber: '1234567890',
        photoURL: 'https://th.bing.com/th/id/R.54e9ec5365eeb967838ffd2a35eda50b?rik=h%2bfY8HSuXACUPQ&riu=http%3a%2f%2fwww.hotavatars.com%2fwp-content%2fuploads%2f2019%2f01%2fI80W1Q0.png&ehk=NSQkB5B%2fUOzON7Gd8fGH9%2bEBxOki2BAu6FdDH0E1TGY%3d&risl=&pid=ImgRaw&r=0',
        providerId: null,
        rememberMe: true,
        uid: '1',
        authUid: '1',
      },
    },
  };