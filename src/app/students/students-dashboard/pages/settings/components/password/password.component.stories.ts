import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PasswordComponent } from "./password.component";

const meta : Meta<PasswordComponent> = {
    title: "Atoms/Password",
    component: PasswordComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
          declarations: [],
          imports: [],
          providers:[]
        }),
      ],

}
export default meta;
type Story = StoryObj<PasswordComponent>;

export const Default:Story = {
    args:{
    }
}