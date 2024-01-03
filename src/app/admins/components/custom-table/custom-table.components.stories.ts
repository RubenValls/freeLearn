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
    data: [{}],
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
