import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StarRatingComponent } from "./star-rating.component";
import { AlertsService } from "src/app/shared/services/alerts/alerts.service";
import { StudentsModule } from "../../students.module";

const meta: Meta<StarRatingComponent> = {
    title: "Components/Students/StarRating",
    component: StarRatingComponent,
    argTypes: { onClick: { action: 'clicked' } },

    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: AlertsService, useValue: {}    
                }

            ],
            imports: [
                
            ]

        })
    ]
};
export default meta;
type Story = StoryObj<StarRatingComponent>;
export const Default: Story = {
    args: {
        ratings: [ {userId : "1", rating: 5}, {userId : "2", rating: 4}, {userId : "3", rating: 3}],
           

       
    }
};