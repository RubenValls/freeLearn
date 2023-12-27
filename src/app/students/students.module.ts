import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';
import { share } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
<<<<<<< HEAD
import { SidebarComponent } from './components/sidebar/sidebar.component';
=======
import { MatDialogModule } from '@angular/material/dialog';
>>>>>>> dev-shared



@NgModule({
  declarations: [
    StudentsDashboardComponent,
<<<<<<< HEAD
    SidebarComponent
=======
>>>>>>> dev-shared
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,



  ]
})
export class StudentsModule { }
