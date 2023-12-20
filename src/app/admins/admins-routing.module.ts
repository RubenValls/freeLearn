import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsDashboardComponent } from './admins-dashboard/admins-dashboard.component';
import { UsersComponent } from './admins-dashboard/pages/users/users.component';
import { TechnologiesComponent } from './admins-dashboard/pages/technologies/technologies.component';
import { CoursesComponent } from './admins-dashboard/pages/courses/courses.component';
import { InstructorsComponent } from './admins-dashboard/pages/instructors/instructors.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { ErrorPageComponent } from '../shared/components/default-pages/error-page/error-page.component';
import { WorkingInProgressComponent } from '../shared/components/default-pages/working-in-progress/working-in-progress.component';

const routes: Routes = [
    { path: '', component: AdminsDashboardComponent, canActivate:[RoleGuard], data: {expectedRole: 'admin'}, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      // { path: 'users', component: UsersComponent },
      { path: 'users', component: WorkingInProgressComponent },
      { path: 'technologies', component: TechnologiesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'instructors', component: InstructorsComponent },
      { path: '**', component: ErrorPageComponent},

    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
