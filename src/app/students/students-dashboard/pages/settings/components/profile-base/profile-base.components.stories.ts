import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProfileBaseComponent } from './profile-base.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/login/store/user.reducer';
import { StudentsModule } from 'src/app/students/students.module';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FirestoreModule } from '@angular/fire/firestore';





const meta: Meta<ProfileBaseComponent> = {
    title: 'Components/Students/ProfileBase',
    component: ProfileBaseComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations: [ButtonComponent],
          imports: [
            FirestoreModule,
            MatDialogModule,
            FormsModule,
            ReactiveFormsModule, 
            StoreModule.forRoot({ user: userReducer }), 
          ],
          providers:[
            UsersService
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