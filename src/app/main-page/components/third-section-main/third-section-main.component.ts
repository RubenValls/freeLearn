import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

@Component({
  selector: 'app-third-section-main',
  templateUrl: './third-section-main.component.html',
  styleUrls: ['./third-section-main.component.scss']
})
export class ThirdSectionMainComponent implements OnInit, OnDestroy{

  trainers$ = this.store.select(selectInstructor);
  trainers: Instructor[] | undefined

  trainerSubscription: Subscription | undefined

  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.trainerSubscription = this.trainers$.subscribe(trainers => {
      this.trainers = [...trainers];
      const duration = trainers.length * 3 + 's';
      setTimeout(() => {
        const carouselItems = this.carousel?.nativeElement.querySelectorAll('.carousel__item');
        carouselItems.forEach((item: any, index: any) => {
          item.style.animationDuration = duration;
          item.style.webkitAnimationDuration = duration;
          if(index === carouselItems.length - 1){
            const delay = `calc(-3s * 2)`;
            item.style.animationDelay = delay;
            item.style.webkitAnimationDelay = delay;
          }else{
            const delay = `calc(3s * ${index - 1})`;
            item.style.animationDelay = delay;
            item.style.webkitAnimationDelay = delay;
          }
        });
      }, 500);
    });
  }

  ngOnDestroy(): void {
    this.trainerSubscription?.unsubscribe()
  }
}
