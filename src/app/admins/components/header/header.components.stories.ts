import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';
import { MatButtonModule } from '@angular/material/button';

//👇 This default export determines where your story goes in the story list
const meta: Meta<HeaderComponent> = {
    title: 'Components/atoms/Admin/Header',
    component: HeaderComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations:[],
          imports: [MatButtonModule] 
        })
      ]
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    //👇 The args you need here will depend on your component
  },
};