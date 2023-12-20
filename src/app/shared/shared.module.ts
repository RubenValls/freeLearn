import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkingInProgressComponent } from './components/default-pages/working-in-progress/working-in-progress.component';
import { ErrorPageComponent } from './components/default-pages/error-page/error-page.component';



@NgModule({
  declarations: [ 
    WorkingInProgressComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [   
    WorkingInProgressComponent,
    ErrorPageComponent
  ]
})
export class SharedModule { }
