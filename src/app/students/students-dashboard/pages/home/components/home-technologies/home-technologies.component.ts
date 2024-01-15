import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-home-technologies',
  templateUrl: './home-technologies.component.html',
  styleUrls: ['./home-technologies.component.css']
})
export class HomeTechnologiesComponent {
  tech$ = this.store.select(selectTechnologies);
  techs: TechnologyType[] | undefined;
  techsSubscription: Subscription | undefined;


  constructor(private store: Store, ){}

  ngOnInit() {
    this.techsSubscription = this.tech$.subscribe((tech) => {
      this.techs = [...tech]; 
      console.log(tech)
    });
  }

  ngOnDestroy(): void {
    this.techsSubscription?.unsubscribe();
  }
}
