import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CustomTableComponent } from './custom-table.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';

//👇 This default export determines where your story goes in the story list
const meta: Meta<CustomTableComponent> = {
  title: 'Components/CustomTable',
  component: CustomTableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [MatTableModule, MatDialogModule, SharedModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CustomTableComponent>;

export const Default: Story = {
  args: {
    data: [{
        id: "1",
        name: "Curso Completo de REACT",
        description: "Description",  
        instructorId: [{id: "BHb6atXs68TPFuj4GnbP", name: "JAB"}], 
        imageUrl: "https://i.ytimg.com/vi/VoMyUgI-5NI/maxresdefault.jpg",
        techs: [{id: "3ZLJDtVSkLGCVMa95S0W", name: "React"}],
        lessons: [],
        rating: [],
        introductionURL: "https://www.youtube.com/watch?v=VoMyUgI-5NI&list=PLRM7PpbqqStKo-NiCuzuYwewZmd9b-EZ9&index=1"
    }],
    displayedColumns: [
      { prop: 'name', title: 'Name' },
      { prop: 'imageUrl', title: 'Image' },
      { prop: 'techs', title: 'Technologies' },
      { prop: 'instructorId', title: 'Instructor' },
      { prop: 'introductionURL', title: 'Introduction' },
      { prop: 'lessons', title: 'NºLessons' },
      { prop: 'rating', title: 'Rating' },
    ],
    rows: [
      { label: 'Id', prop: 'id' },
      { label: 'Name', prop: 'name' },
      { label: 'Image', prop: 'imageUrl' },
      { label: 'Technologies', prop: 'techs' },
      { label: 'Instructor', prop: 'instructorId' },
      { label: 'Introduction', prop: 'introductionURL' },
      { label: 'Lessons', prop: 'lessons' },
    ],
  },
};
