import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsDashboardComponent } from './students-dashboard/students-dashboard.component';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './students-dashboard/pages/home/home.component';
import { CoursesComponent } from './students-dashboard/pages/courses/courses.component';
import { TrainersComponent } from './students-dashboard/pages/trainers/trainers.component';
import { TechnologiesComponent } from './students-dashboard/pages/technologies/technologies.component';
import { SettingsComponent } from './students-dashboard/pages/settings/settings.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MenuSettingsComponent } from './students-dashboard/pages/settings/components/menu-settings/menu-settings.component';
import { ProfileBaseComponent } from './students-dashboard/pages/settings/components/profile-base/profile-base.component';
import { PasswordComponent } from './students-dashboard/pages/settings/components/password/password.component';
import { CourseCardsComponent } from './students-dashboard/pages/courses/components/course-cards/course-cards.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorPageComponent } from './students-dashboard/pages/trainers/components/instructor-page/instructor-page.component';
import { InstructorsMainPageComponent } from './students-dashboard/pages/trainers/components/instructors-main-page/instructors-main-page.component';
import { CoursePageComponent } from './students-dashboard/pages/courses/components/course-page/course-page.component';
import { CoursesMainPageComponent } from './students-dashboard/pages/courses/components/courses-main-page/courses-main-page.component';
import { HeaderCourseComponent } from './students-dashboard/pages/courses/components/course-page/header-course/header-course.component';
import { DetailsCourseComponent } from './students-dashboard/pages/courses/components/course-page/details-course/details-course.component';
import { LessonsCourseComponent } from './students-dashboard/pages/courses/components/course-page/lessons-course/lessons-course.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './students-dashboard/pages/trainers/components/instructor-page/components/header/header.component';
import { CoursesSectionComponent } from './students-dashboard/pages/trainers/components/instructor-page/components/courses-section/courses-section.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MatButtonModule } from '@angular/material/button';
import { CardTechComponent } from './students-dashboard/pages/technologies/components/card-tech/card-tech.component';
import { TechsMainPageComponent } from './students-dashboard/pages/technologies/components/techs-main-page/techs-main-page.component';
import { TechPageComponent } from './students-dashboard/pages/technologies/components/tech-page/tech-page.component';
import { HeroComponent } from './students-dashboard/pages/home/components/hero/hero.component';
import { CustomCardComponent } from './students-dashboard/pages/home/components/custom-card/custom-card.component';
import { HomeCoursesComponent } from './students-dashboard/pages/home/components/home-courses/home-courses.component';
import { HomeFavoritesComponent } from './students-dashboard/pages/home/components/home-favorites/home-favorites.component';
import { HomeTechnologiesComponent } from './students-dashboard/pages/home/components/home-technologies/home-technologies.component';
import { HomeTrainersComponent } from './students-dashboard/pages/home/components/home-trainers/home-trainers.component';



@NgModule({
  declarations: [
    StudentsDashboardComponent,
    SidebarComponent,
    HomeComponent,
    CoursesComponent,
    TrainersComponent,
    TechnologiesComponent,
    SettingsComponent,
    MenuSettingsComponent,
    ProfileBaseComponent,
    PasswordComponent,
    CourseCardsComponent,
    InstructorPageComponent,
    InstructorsMainPageComponent,
    CoursePageComponent,
    CoursesMainPageComponent,
    HeaderCourseComponent,
    DetailsCourseComponent,
    LessonsCourseComponent,
    HeaderComponent,
    CoursesSectionComponent,
    StarRatingComponent,
    CardTechComponent,
    TechsMainPageComponent,
    TechPageComponent,
    HeroComponent,
    CustomCardComponent,
    HomeCoursesComponent,
    HomeFavoritesComponent,
    HomeTechnologiesComponent,
    HomeTrainersComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,    
    MatButtonModule,
    NgbAccordionModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StudentsModule { }
