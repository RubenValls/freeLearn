import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Rating } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {

  @Input('rating') ratings: Rating[] | undefined;
  rating: number = 0;
  starCount: number = 5;
  color: string = 'accent';
  @Output() ratingUpdated = new EventEmitter();
  ratingArr: number[] = [];

  constructor(
    private alertsService: AlertsService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setRatingAverage(this.ratings ? this.ratings : [])
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.setRatingAverage(this.ratings ? this.ratings : [])
  }

  onClick(rating:number) {
    this.alertsService.successMessage(rating > 1 ? `Rated trainer with ${rating} stars.` : `Rated trainer with ${rating} star.`)
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }

  }

  setRatingAverage(ratings: Rating[]): void {
    const sum = ratings.reduce((total, item) => total + item.rating, 0);
    const average = sum / ratings.length;
    const roundedAverage = Math.round(average);

    this.rating = roundedAverage;
  }
}
