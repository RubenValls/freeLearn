import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';


const meta: Meta<ButtonComponent> = {
    title: 'Components/Button',
    component: ButtonComponent,  
    tags: ['autodocs'], 
    render: (args: ButtonComponent) => ({
        props: {
            backgroundColor: null,
            ...args,
        },
    }),    
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
    args: {
        label: 'Primary',
        type: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        type: 'secondary',
    },
};
export const Gradient: Story = {
  args: {
      label: 'Gradient',
        type: 'gradient',
  },
};
export const Info: Story = {
    args: {
        label: 'Info',
          type: 'info',
    },
  };
  export const Success: Story = {
    args: {
        label: 'Success',
          type: 'success',
    },
  };


  export const Danger: Story = {
    args: {
        label: 'Danger',
          type: 'danger',
    },
  };

  export const Warning: Story = {
    args: {
        label: 'Warning',
          type: 'warning',
    },
  };
export const Large: Story = {
    args: {     
      label: 'Large',
      size: 'large',
    
    },
  };

  export const Small: Story = {
    args: { 
      label: 'Small',
        size: 'small',
    },
  };
  export const Medium: Story = {
    args: { 
      label: 'Medium',
        size: 'medium',
    },
  };
