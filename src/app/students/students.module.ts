import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [
    StudentsDashboardComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
  ]
})
export class StudentsModule { }
