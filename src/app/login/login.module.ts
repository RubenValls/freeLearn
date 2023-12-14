import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
