import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-techs-main-page',
  templateUrl: './techs-main-page.component.html',
  styleUrls: ['./techs-main-page.component.scss']
})
export class TechsMainPageComponent {
  tech$ = this.store.select(selectTechnologies);
  techs: any

  constructor(private store: Store){

  }

  ngOnInit() {
    this.tech$.subscribe((tech) => {
      this.techs = tech; 
    });
  }
}
