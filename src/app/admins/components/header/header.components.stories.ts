import type { Meta, StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';

//👇 This default export determines where your story goes in the story list
const meta: Meta<HeaderComponent> = {
    title: 'Components/Headers/AdminHeader/Default',
    component: HeaderComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const AdminHeader: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};