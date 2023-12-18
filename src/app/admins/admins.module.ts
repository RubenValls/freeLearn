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
import { AddCourseFormComponent } from './admins-dashboard/pages/courses/forms/add-course-form/add-course-form.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    AdminsDashboardComponent,
    HeaderComponent,
    UsersComponent,
    TechnologiesComponent,
    CoursesComponent,
    InstructorsComponent,
    AddCourseFormComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatButtonToggleModule,

    
  ]
})
export class AdminsModule { }
