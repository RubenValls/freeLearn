import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './students-dashboard/pages/home/home.component';
import { CoursesComponent } from './students-dashboard/pages/courses/courses.component';
import { TrainersComponent } from './students-dashboard/pages/trainers/trainers.component';
import { TechnologiesComponent } from './students-dashboard/pages/technologies/technologies.component';
import { SettingsComponent } from './students-dashboard/pages/settings/settings.component';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [
    StudentsDashboardComponent,
    SidebarComponent,
    HomeComponent,
    CoursesComponent,
    TrainersComponent,
    TechnologiesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class StudentsModule { }
