import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageHeaderComponent } from './components/main-page-header/main-page-header.component';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageHeaderComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
    
  ]
})
export class MainPageModule { }
