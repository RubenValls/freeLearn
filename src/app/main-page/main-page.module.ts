import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageHeaderComponent } from './components/main-page-header/main-page-header.component';



@NgModule({
  declarations: [
    MainPageComponent,
    MainPageHeaderComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule
  ]
})
export class MainPageModule { }
