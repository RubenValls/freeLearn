import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DeleteModalComponent } from './delete-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/login/store/user.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


const Meta : Meta<DeleteModalComponent> = {
    title: 'Molecules/DeleteModal',
    component: DeleteModalComponent,
    tags: ['autodocs'], 
    decorators: [
        moduleMetadata({
        declarations:[ButtonComponent],
        imports: [ StoreModule.forRoot({ user: userReducer }), BrowserAnimationsModule, MatDialogModule, MatIconModule,  ],
        providers: [ AlertsService,
            { provide: MAT_DIALOG_DATA, useValue: {} },
            { provide: MatDialogRef, useValue: {} },
        ],

        })
    ]

};
export default Meta;
type Story = StoryObj<DeleteModalComponent>;

export const Default: Story = {
    args: {
        data: {
            onDelete: () => {},
            id: '1',
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
        },
    },
};



