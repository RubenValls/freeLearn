import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { HeaderCourseComponent } from "./header-course.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { UsersService } from "src/app/shared/services/users/users.service";

const meta: Meta<HeaderCourseComponent> = {
    title: "Components/Students/HeaderCourse",
    component: HeaderCourseComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            providers: [
                { 
                  provide: ActivatedRoute, 
                  useValue: {
                    params: of({ id: 'test' }),
                    data: of({ data: { id: 'test' } })
                  } 
                },
               { provide: UsersService, useValue: { getUserFromStorage: () => ({ id: 'test' }) } },
                
              ],           
         
        })
    ]
    
};
export default meta;
type Story = StoryObj<HeaderCourseComponent>;
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