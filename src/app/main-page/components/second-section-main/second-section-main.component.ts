import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-second-section-main',
  templateUrl: './second-section-main.component.html',
  styleUrls: ['./second-section-main.component.scss']
})
export class SecondSectionMainComponent implements OnInit {
  technologies$ = this.store.select(selectTechnologies);
  visibleTechnologies: any[] = [];
  currentIndex = 0;

  constructor(
    private techService: TechService,
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.store.dispatch({ type: 'Fetch Technologies' });
    this.technologies$.subscribe(technologies => {
      this.visibleTechnologies = technologies.slice(this.currentIndex, this.currentIndex + 3);
    });
  }

  next() {
    const maxIndex = this.visibleTechnologies.length;
    if (this.currentIndex <= maxIndex) {
      this.currentIndex = this.currentIndex + 3;
      this.updateVisibleTechnologies();
      console.log("Siguiente");
    } else {
      console.log("No more");
    }
  }

  prev() {
    if (this.currentIndex >= 3) {
      this.currentIndex = this.currentIndex - 3;
      this.updateVisibleTechnologies();
      console.log("Prev");
    } else {
      console.log("No less");
    }
  }

  private updateVisibleTechnologies() {
    this.technologies$.pipe(
      map(technologies => technologies.slice(this.currentIndex, this.currentIndex + 3))
    ).subscribe(visibleTechnologies => {
      this.visibleTechnologies = visibleTechnologies;
    });
  }
}
