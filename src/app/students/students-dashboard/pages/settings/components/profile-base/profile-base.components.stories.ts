import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProfileBaseComponent } from './profile-base.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/login/store/user.reducer';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Firestore, FirestoreModule } from "@angular/fire/firestore";
import { FirebaseApp, FirebaseAppModule } from "@angular/fire/app";
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';




const meta: Meta<ProfileBaseComponent> = {
    title: 'Molecules/ProfileBase',
    component: ProfileBaseComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations: [ButtonComponent],
          imports: [
            BrowserAnimationsModule,
            MatSnackBarModule,
            FirestoreModule,
            FirebaseAppModule,
            MatDialogModule,
            MatIconModule,
            MatInputModule,
            FormsModule,
            ReactiveFormsModule, 
            StoreModule.forRoot({ user: userReducer }), 
          ],
          providers:[
            UsersService,
            AlertsService,
            { provide: Firestore, useValue: {} },
            { provide: FirebaseApp, useValue: {} },
           
         
          ]
        }),
      ],
};

export default meta;
type Story = StoryObj<ProfileBaseComponent>;

export const FirstStory: Story = {
  args: {
  },
};