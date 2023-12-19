import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { RoleGuard } from '../shared/guards/role.guard';

const routes: Routes = [
    { path: '', component: StudentsDashboardComponent, canActivate:[RoleGuard], data: {expectedRole: 'student'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }