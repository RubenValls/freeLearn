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



@NgModule({
  declarations: [
    AdminsDashboardComponent,
    HeaderComponent,
    UsersComponent,
    TechnologiesComponent,
    CoursesComponent,
    InstructorsComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
