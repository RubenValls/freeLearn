

import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StarRatingComponent } from './star-rating.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export default {
  title: "Molecules/StarRating",
  component: StarRatingComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule, MatSnackBarModule, MatTooltipModule, MatButtonModule, MatIconModule],
      providers: [AlertsService],
    }),
  ],
};

export const Default = () => ({
  component: StarRatingComponent,
  props: {
    rating: [{ rating: 2 }, { rating: 4 }, { rating: 5 }],
  },
});
