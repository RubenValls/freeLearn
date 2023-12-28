import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

@Component({
  selector: 'app-third-section-main',
  templateUrl: './third-section-main.component.html',
  styleUrls: ['./third-section-main.component.scss']
})
export class ThirdSectionMainComponent implements OnInit{

  trainers$ = this.store.select(selectInstructor);
  trainers: Instructor[] | undefined

  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.trainers$.subscribe(trainers => {
      this.trainers = [...trainers]
      setTimeout(() => {
        const carouselItems = this.carousel?.nativeElement.querySelectorAll('.carousel__item');
        carouselItems.forEach((item: any, index: any) => {
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
}
