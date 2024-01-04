import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkingInProgressComponent } from './components/default-pages/working-in-progress/working-in-progress.component';
import { ErrorPageComponent } from './components/default-pages/error-page/error-page.component';
import { ButtonComponent } from './components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateModalComponent } from './components/modals/update-modal/update-modal.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { DetailModalComponent } from './components/modals/detail-modal/detail-modal.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { SubDetailModalComponent } from './components/modals/sub-modals/sub-detail-modal/sub-detail-modal.component';
import { SubModalCreateComponent } from './components/modals/sub-modals/sub-modal-create/sub-modal-create.component';
import { RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [ 
    WorkingInProgressComponent,
    ErrorPageComponent,
    ButtonComponent,
    UpdateModalComponent,
    DeleteModalComponent,
    DetailModalComponent,
    CourseCardComponent,
    SubDetailModalComponent,
    SubModalCreateComponent,
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
    RouterModule,
    MatOptionModule,
    MatSelectModule,

  ],
  exports: [   
    WorkingInProgressComponent,
    ErrorPageComponent,
    ButtonComponent,
    CourseCardComponent,
  ]
})
export class SharedModule { }
