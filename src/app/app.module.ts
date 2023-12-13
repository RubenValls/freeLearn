import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { StudentsModule } from './students/students.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { AdminsModule } from './admins/admins.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    StudentsModule,
    SharedModule,
    LoginModule,
    AdminsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
