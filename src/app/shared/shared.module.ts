import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkingInProgressComponent } from './components/default-pages/working-in-progress/working-in-progress.component';
import { ErrorPageComponent } from './components/default-pages/error-page/error-page.component';
import { BtnGradientComponent } from './components/btn-gradient/btn-gradient.component';
import { BtnBlackComponent } from './components/btn-black/btn-black.component';




@NgModule({
  declarations: [ 
    WorkingInProgressComponent,
    ErrorPageComponent,
    BtnGradientComponent,
    BtnBlackComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  exports: [   
    WorkingInProgressComponent,
    ErrorPageComponent,
    BtnGradientComponent,
    BtnBlackComponent,
  ]
})
export class SharedModule { }
