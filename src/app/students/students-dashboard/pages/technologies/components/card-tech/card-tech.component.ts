import { Component, Input } from '@angular/core';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';

@Component({
  selector: 'app-card-tech',
  templateUrl: './card-tech.component.html',
  styleUrls: ['./card-tech.component.scss']
})
export class CardTechComponent {

  @Input() tech: TechnologyType | undefined;

}
