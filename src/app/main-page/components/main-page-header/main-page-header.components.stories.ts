import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { MainPageHeaderComponent } from './main-page-header.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';



//👇 This default export determines where your story goes in the story list
const meta: Meta<MainPageHeaderComponent> = {
    title: 'Atoms/HeaderMainPage',
    component: MainPageHeaderComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations:[ButtonComponent]
        })
      ]
};

export default meta;
type Story = StoryObj<MainPageHeaderComponent>;

export const Default: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};