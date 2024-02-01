import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-second-section-main',
  templateUrl: './second-section-main.component.html',
  styleUrls: ['./second-section-main.component.scss']
})
export class SecondSectionMainComponent implements OnInit, OnDestroy {
  technologies$ = this.store.select(selectTechnologies);
  visibleTechnologies: any[] = [];
  currentIndex = 0;

  techSubscription: Subscription | undefined

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.techSubscription = this.technologies$.subscribe(technologies => {
      this.visibleTechnologies = technologies.slice(this.currentIndex, this.currentIndex + 4);
    });
  }

  ngOnDestroy(): void {
    this.techSubscription?.unsubscribe()
  }
  

  next() {
    const maxIndex = this.visibleTechnologies.length;
    if (this.currentIndex <= maxIndex) {
      this.currentIndex = this.currentIndex + 1;
      this.updateVisibleTechnologies();
    } else {
      this.currentIndex=0
      this.techSubscription = this.technologies$.subscribe(technologies => {
        this.visibleTechnologies = technologies.slice(this.currentIndex, this.currentIndex + 4);
      });
    }
  }

  prev() {
    if (this.currentIndex >= 1) {
      this.currentIndex = this.currentIndex - 1;
      this.updateVisibleTechnologies();
    } else {
      this.techSubscription = this.technologies$.subscribe(technologies => {
        const totalTechnologies = technologies.length;
        this.currentIndex = Math.max(0, totalTechnologies - 4);
        this.visibleTechnologies = technologies.slice(this.currentIndex, this.currentIndex + 4);
      });
    }
  }

  
  updateVisibleTechnologies() {
    this.techSubscription = this.technologies$.pipe(
      map(technologies => technologies.slice(this.currentIndex, this.currentIndex + 4))
    ).subscribe(visibleTechnologies => {
      this.visibleTechnologies = visibleTechnologies;
    });
  }
}
