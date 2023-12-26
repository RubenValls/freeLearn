import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkingInProgressComponent } from './components/default-pages/working-in-progress/working-in-progress.component';
import { ErrorPageComponent } from './components/default-pages/error-page/error-page.component';
import { BtnGradientComponent } from './components/btn-gradient/btn-gradient.component';
import { BtnBlackComponent } from './components/btn-black/btn-black.component';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateModalComponent } from './components/modals/update-modal/update-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { DetailModalComponent } from './components/modals/detail-modal/detail-modal.component';


@NgModule({
  declarations: [ 
    WorkingInProgressComponent,
    ErrorPageComponent,
    BtnGradientComponent,
    BtnBlackComponent,
    ButtonComponent,
    UpdateModalComponent,
    DeleteModalComponent,
    DetailModalComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,

  ],
  exports: [   
    WorkingInProgressComponent,
    ErrorPageComponent,
    BtnGradientComponent,
    BtnBlackComponent,
    ButtonComponent,
    
  ]
})
export class SharedModule { }
