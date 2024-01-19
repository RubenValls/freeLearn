import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { UpdateModalComponent } from './update-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/login/store/user.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

const Meta : Meta<UpdateModalComponent> ={
    title: 'Molecules/UpdateModal',
    component: UpdateModalComponent,
    tags: ['autodocs'], 
    decorators: [
        moduleMetadata({
        declarations:[ButtonComponent],
        imports: [ StoreModule.forRoot({ user: userReducer }), BrowserAnimationsModule, MatDialogModule, MatIconModule,  ],
        providers: [
            { provide: MAT_DIALOG_DATA, useValue: {
                title: '',
                onEdit: () => {},
                editData: {
                    value: {
                        name: 'React',
                        imageUrl:
                            'https://miro.medium.com/v2/resize:fit:1200/1*XOSA6j_mJ3oz6g8MfoHDpg.jpeg',
                        description: 'Curso de React desde cero. ¿Qué es? ¿Por qué deberías aprenderlo? ',
                        lessons: [],
                        techs: [{ id: '1', name: 'React' }],
                        rating: [],
                        introductionURL: 'https://example.com/introduction',
                        instructorId: [{ id: '1', name: 'Midudev' }],
                    },
                },
            } },
            { provide: MatDialogRef, useValue: {} },
        ],
        })
    ]


}

export default Meta;
type Story = StoryObj<UpdateModalComponent>;

export const Default: Story = {
    args :{ }
};