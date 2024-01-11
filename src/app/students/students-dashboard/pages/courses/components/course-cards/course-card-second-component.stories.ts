import { moduleMetadata,  type Meta, type StoryObj } from "@storybook/angular";
import { CourseCardsComponent } from "./course-cards.component";

const meta:Meta<CourseCardsComponent> = {
    title: "Components/Students/CourseCards",
    component: CourseCardsComponent,
    tags: ['autodocs'],
    
};
export default meta;
type Story = StoryObj<CourseCardsComponent>;
export const Default:Story = {
    args:{
        course:{
            name: "Example Course",
            imageUrl: "https://banner2.cleanpng.com/20180420/sxw/kisspng-angularjs-ruby-on-rails-typescript-web-application-icon-hacker-5ad97b80139367.5630065415242023680802.jpg",
            description: "This is an example course description.",
            lessons: [],
            techs: [{id:"1", name: "Angular"}],
            rating: [],
            introductionURL: "https://example.com/introduction",
            instructorId: [
                {id:"1", name: "Midudev"}
            ]
        }
    }
};