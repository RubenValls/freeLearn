import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { SnackbarComponent } from './snackbar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

const meta: Meta<SnackbarComponent> = {
  title: 'Atoms/Alerts',
  component: SnackbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatSnackBarModule, BrowserAnimationsModule,],
      providers: [
        AlertsService,
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
      ],
      declarations: [ButtonComponent]
    }),
  ],
};

export default meta;

type Story = StoryObj<SnackbarComponent>;

export const successAlert: any = (args: SnackbarComponent) => ({
  component: SnackbarComponent,
  props: {
    ...args,
    type: 'success'
  },
});

export const errorAlert: any = (args: SnackbarComponent) => ({
    component: SnackbarComponent,
    props: {
      ...args,
      type: 'error'
    },
  });

  export const warningAlert: any = (args: SnackbarComponent) => ({
    component: SnackbarComponent,
    props: {
      ...args,
      type: 'warning'
    },
  });