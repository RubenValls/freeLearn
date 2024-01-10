import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {

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
