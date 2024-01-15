import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './login/store/user.reducer'; 
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { coursesReducer } from './store/courses/courses.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses/courses.effects';
import { technologiesReducer } from './store/technologies/technologies.reducer';
import { TechnologiesEffects } from './store/technologies/technologies.effects';
import { instructorsReducer } from './store/instructors/instructors.reducer';
import { InstructorsEffects } from './store/instructors/instructors.effects';
import { SharedModule } from './shared/shared.module';
import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';
import { courseReducer } from './admins/admins-dashboard/pages/courses/store/course/course.reducer';


 
@NgModule({
  declarations: [
    AppComponent,
    
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    StoreModule.forRoot({
      user: userReducer,
      courses: coursesReducer,
      technologies: technologiesReducer,
      instructors: instructorsReducer,
      users: usersReducer,
      course: courseReducer
    }),
    EffectsModule.forRoot(CoursesEffects, TechnologiesEffects, InstructorsEffects, UsersEffects),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 