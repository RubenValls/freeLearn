import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    StudentsDashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,



  ]
})
export class StudentsModule { }
