import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-techs-main-page',
  templateUrl: './techs-main-page.component.html',
  styleUrls: ['./techs-main-page.component.scss']
})
export class TechsMainPageComponent {
  tech$ = this.store.select(selectTechnologies);
  techs: any

  filteredTechs: TechnologyType[] = [];
  name = new FormControl('');

  constructor(private store: Store, ){

  }

  ngOnInit() {
    this.tech$.subscribe((tech) => {
      this.techs = tech; 
    });
    this.name.valueChanges.subscribe(value => {
      this.filteredTechs = this.filterByName(this.techs, value || '')
    });
  }

  filterByName(array: TechnologyType[], input: string) {
    console.log(array);
    return array.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
  }

  getTech(){
    if(this.filteredTechs.length > 0){
      return this.filteredTechs
    }else{
      return this.techs
    }
  }
}
