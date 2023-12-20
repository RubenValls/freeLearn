import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StudentsDashboardComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
  ]
})
export class StudentsModule { }
