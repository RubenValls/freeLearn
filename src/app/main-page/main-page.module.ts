import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageHeaderComponent } from './components/main-page-header/main-page-header.component';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { FirstSectionMainComponent } from './components/first-section-main/first-section-main.component';
import { SecondSectionMainComponent } from './components/second-section-main/second-section-main.component';
import { ThirdSectionMainComponent } from './components/third-section-main/third-section-main.component';
import { FourthSectionMainComponent } from './components/fourth-section-main/fourth-section-main.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageHeaderComponent,
    FirstSectionMainComponent,
    SecondSectionMainComponent,
    ThirdSectionMainComponent,
    FourthSectionMainComponent
    
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    SharedModule,
    
  ]
})
export class MainPageModule { }
