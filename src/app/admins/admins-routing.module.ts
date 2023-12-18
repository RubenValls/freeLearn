import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsDashboardComponent } from './admins-dashboard/admins-dashboard.component';
import { UsersComponent } from './admins-dashboard/pages/users/users.component';
import { TechnologiesComponent } from './admins-dashboard/pages/technologies/technologies.component';
import { CoursesComponent } from './admins-dashboard/pages/courses/courses.component';
import { InstructorsComponent } from './admins-dashboard/pages/instructors/instructors.component';

const routes: Routes = [
    { path: '', component: AdminsDashboardComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'technologies', component: TechnologiesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'instructors', component: InstructorsComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
