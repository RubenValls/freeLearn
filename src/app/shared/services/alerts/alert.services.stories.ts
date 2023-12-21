

import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import type { Meta, Story } from '@storybook/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertsService } from './alerts.service';

export default {
  title: 'Services/AlertsService',
  component: AlertsService,
  tags: ['autodocs'], 
  decorators: [
    moduleMetadata({
      imports: [MatSnackBarModule],
      providers: [AlertsService],
    }),
  ],
} as Meta;

const Template: Story<AlertsService> = (args) => ({
    template: '',
    providers: [AlertsService],
    props: args,
    onInit: (story: any) => {
      const alertsService = story.componentRef.injector.get(AlertsService);
      alertsService.errorMessage('This is an error message', 'Close', 2000);
    },
  });
  
  export const ErrorMessage = Template.bind({});
  ErrorMessage.args = {};





// export const ErrorMessage: Story = () => ({
//   template: '<div>{{ errorrMessageText }}</div>',
//   providers: [AlertsService],
//   props: {
//     errorMessageText: 'This is a Error message',
  
//   },
//   onInit: (story:any) => {
//     const alertsService = story.componentRef.injector.get(AlertsService);
//     alertsService.errorrMessageText('¡Error!', 'Close', 2000);
//   },
// });

// export const SuccessMessage: Story = () => ({
//   template: '<div>{{ successMessageText }}</div>',
//   providers: [AlertsService],
//   props: {
//     successMessageText: 'This is a success message',
  
//   },
//   onInit: (story:any) => {
//     const alertsService = story.componentRef.injector.get(AlertsService);
//     alertsService.successMessage('¡Operación exitosa!', 'Cerrar', 2000);
//   },
// });

// export const WarningMessage: Story = () => ({
//   template:  '<div>{{ WarningMessageText }}</div>',
//   providers: [AlertsService],
//   props: {
//     WarningMessageText: 'This is a warning message',  
//   },
//   onInit: (story:any) => {
//     const alertsService = story.componentRef.injector.get(AlertsService);
//     alertsService.WarningMessage('Warning', 'Cerrar', 2000);
//   },
// });
