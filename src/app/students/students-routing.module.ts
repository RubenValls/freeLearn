import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { HomeComponent } from './students-dashboard/pages/home/home.component';
import { CoursesComponent } from './students-dashboard/pages/courses/courses.component';
import { TrainersComponent } from './students-dashboard/pages/trainers/trainers.component';
import { TechnologiesComponent } from './students-dashboard/pages/technologies/technologies.component';
import { SettingsComponent } from './students-dashboard/pages/settings/settings.component';
import { ProfileBaseComponent } from './students-dashboard/pages/settings/components/profile-base/profile-base.component';
import { PasswordComponent } from './students-dashboard/pages/settings/components/password/password.component';
import { RoleGuard } from '../shared/guards/role/role.guard';
import { InstructorPageComponent } from './students-dashboard/pages/trainers/components/instructor-page/instructor-page.component';
import { InstructorsMainPageComponent } from './students-dashboard/pages/trainers/components/instructors-main-page/instructors-main-page.component';
import { instructorResolver } from './students-dashboard/pages/trainers/resolver/instructor.resolver';
import { CoursesMainPageComponent } from './students-dashboard/pages/courses/components/courses-main-page/courses-main-page.component';
import { CoursePageComponent } from './students-dashboard/pages/courses/components/course-page/course-page.component';
import { courseResolver } from './students-dashboard/pages/courses/resolver/course.resolver';
import { TechsMainPageComponent } from './students-dashboard/pages/technologies/components/techs-main-page/techs-main-page.component';
import { TechPageComponent } from './students-dashboard/pages/technologies/components/tech-page/tech-page.component';
import { technologiesResolver } from './students-dashboard/pages/technologies/resolver/technologies.resolver';
import { WorkingInProgressComponent } from '../shared/components/default-pages/working-in-progress/working-in-progress.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsDashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'student' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'courses',
        component: CoursesComponent,
        children: [
          { path: '', component: CoursesMainPageComponent },
          {
            path: ':id',
            component: CoursePageComponent,
            resolve: {
              data: courseResolver,
            },
          },
        ],
      },
      {
        path: 'trainers',
        component: TrainersComponent,
        children: [
          { path: '', component: InstructorsMainPageComponent },
          {
            path: ':id',
            component: InstructorPageComponent,
            resolve: {
              data: instructorResolver,
            },
          },
        ],
      },
      {
        path: 'technologies',
        component: TechnologiesComponent,
        children: [
          { path: '', component: TechsMainPageComponent },
          {
            path: ':id',
            component: TechPageComponent,
            resolve: {
              data: technologiesResolver,
            },
          },
        ],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileBaseComponent },
          { path: 'password', component: PasswordComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
