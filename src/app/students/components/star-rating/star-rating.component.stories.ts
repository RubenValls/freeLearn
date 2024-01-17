import { moduleMetadata, type Meta, type StoryObj } from "@storybook/angular";
import { StarRatingComponent } from "./star-rating.component";
import { AlertsService } from "src/app/shared/services/alerts/alerts.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { APP_INITIALIZER } from "@angular/core";
import { of } from "rxjs";
import { successAlert } from "src/app/shared/storybook/components/snackbar/snackbar.component.stories";

const meta: Meta<StarRatingComponent> = {
    title: "Components/Students/StarRating",
    component: StarRatingComponent,

    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: service,
                    deps: [AlertsService, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar],

                },
                {
                    provide: AlertsService,
                    useValue: {
                        successMessage: (message: string) => {
                            return of(message);
                        }
                    }
                },
                {
                    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
                    useValue: {
                        duration: 5000,
                        horizontalPosition: "right",
                        verticalPosition: "top"
                    }
                }
            ],
            imports: [MatButtonModule, MatIconModule, MatSnackBarModule, MatTooltipModule

            ]

        })
    ]
};
function service (alertsService: AlertsService) {
    return () => {
        alertsService.successMessage("success");
    };
}
export default meta;
type Story = StoryObj<StarRatingComponent>;
export const Default: Story = {
    args: {
        finalRating: 3,
        rating: [{ userId: "1", rating: 3 }, { userId: "2", rating: 4 }, { userId: "3", rating: 5 }],

        onClick: (rating: number) => {
            
            return false;
        }
    }
};

