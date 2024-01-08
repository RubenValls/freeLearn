import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { HomeComponent } from './students-dashboard/pages/home/home.component';
import { CoursesComponent } from './students-dashboard/pages/courses/courses.component';
import { TrainersComponent } from './students-dashboard/pages/trainers/trainers.component';
import { TechnologiesComponent } from './students-dashboard/pages/technologies/technologies.component';
import { SettingsComponent } from './students-dashboard/pages/settings/settings.component';
import { ProfileBaseComponent } from './students-dashboard/pages/settings/components/profile-base/profile-base.component';
import { PasswordComponent } from './students-dashboard/pages/settings/components/password/password.component';
import { InstructorPageComponent } from './students-dashboard/pages/trainers/components/instructor-page/instructor-page.component';
import { InstructorsMainPageComponent } from './students-dashboard/pages/trainers/components/instructors-main-page/instructors-main-page.component';
import { instructorResolver } from './students-dashboard/pages/trainers/resolver/instructor.resolver';

const routes: Routes = [
    { path: '', component: StudentsDashboardComponent, canActivate:[RoleGuard], data: {expectedRole: 'student'}, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'trainers', component: TrainersComponent, children: [
        { path: '', component: InstructorsMainPageComponent },
        { path: ':id', component: InstructorPageComponent, resolve: {
          data: instructorResolver
        } }
      ] },
      { path: 'technologies', component: TechnologiesComponent },
      { path: 'settings', component: SettingsComponent, children:[
        { path: '', component: ProfileBaseComponent },
        { path: 'password', component: PasswordComponent },
      ] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }