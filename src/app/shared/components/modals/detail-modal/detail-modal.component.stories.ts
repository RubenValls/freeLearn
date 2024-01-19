import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DetailModalComponent } from './detail-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/login/store/user.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const Meta : Meta<DetailModalComponent> = {
    title: 'Molecules/DetailModal',
    component: DetailModalComponent,
    tags: ['autodocs'], 
    decorators: [
        moduleMetadata({
        declarations:[ButtonComponent],
        imports: [ StoreModule.forRoot({ user: userReducer }), BrowserAnimationsModule, MatDialogModule, MatIconModule, ReactiveFormsModule, MatInputModule ],
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: {
                title: '',
                totalCourses: null,
                rows :[
                    { label: 'Id', prop: 'id' },
                    { label: 'Name', prop: 'name' },   
                    { label: 'Description', prop: 'description'},
                    { label: 'Image', prop: 'imageUrl' },
                    { label: 'Technologies', prop: 'techs'},
                    { label: 'Instructor', prop: 'instructorId' },
                    { label: 'Introduction', prop: 'introductionURL' },    
                    { label: 'Lessons', prop: 'lessons'},    
                    { prop: 'rating', title: 'Rating'},
                  ] ,
                form: {},
                socialMediaForm: {},
                techsForm: {},
                techs: [{}],
                instructors: [],
                lessons: [],
                totalLessons: '',
                isCourse: false,
                course$: {},
                course: {}
              } },
            { provide: MatDialogRef, useValue: {} },
         ],
        })
    ]

};

export default Meta;
type Story = StoryObj<DetailModalComponent>;

export const Default: Story = {

    args: {
       
    },

};