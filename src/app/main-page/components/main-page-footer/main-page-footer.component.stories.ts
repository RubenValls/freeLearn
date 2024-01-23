import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MainPageFooterComponent } from './main-page-footer.component';

const meta : Meta< MainPageFooterComponent> = {
    title: 'Molecules/MainPageFooter',
    component: MainPageFooterComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
        declarations: [],
        imports: [],
        providers: [],
        }),
    ],
    
};

export default meta;
type Story = StoryObj< MainPageFooterComponent>;
export const Default: Story = {
    args: {
    },
};