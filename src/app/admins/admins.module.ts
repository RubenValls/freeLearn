import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminsDashboardComponent } from './admins-dashboard/admins-dashboard.component';
import { AdminsRoutingModule } from './admins-routing.module';



@NgModule({
  declarations: [
    AdminsDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
  ]
})
export class AdminsModule { }
