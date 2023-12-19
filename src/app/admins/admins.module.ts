import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsDashboardComponent } from './admins-dashboard/admins-dashboard.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { UsersComponent } from './admins-dashboard/pages/users/users.component';
import { TechnologiesComponent } from './admins-dashboard/pages/technologies/technologies.component';
import { CoursesComponent } from './admins-dashboard/pages/courses/courses.component';
import { InstructorsComponent } from './admins-dashboard/pages/instructors/instructors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateInstructorsFormComponent } from './admins-dashboard/pages/instructors/create-instructors-form/create-instructors-form.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AdminsDashboardComponent,
    HeaderComponent,
    UsersComponent,
    TechnologiesComponent,
    CoursesComponent,
    InstructorsComponent,
    CreateInstructorsFormComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class AdminsModule { }
