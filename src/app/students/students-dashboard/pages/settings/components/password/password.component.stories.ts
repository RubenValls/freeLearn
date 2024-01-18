import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PasswordComponent } from "./password.component";
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

const meta : Meta<PasswordComponent> = {
    title: "Atoms/Password",
    component: PasswordComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations: [],
          imports: [
            BrowserAnimationsModule,
            MatSnackBarModule,
            MatInputModule,
            ReactiveFormsModule,
            MatIconModule,
          ],
          providers:[
            AlertsService,
          
        ]
        }),
      ],

}
export default meta;
type Story = StoryObj<PasswordComponent>;

export const Default:Story = {
    args:{
    }
}