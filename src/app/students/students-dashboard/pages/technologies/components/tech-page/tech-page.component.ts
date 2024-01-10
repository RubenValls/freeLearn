import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';


@Component({
  selector: 'app-tech-page',
  templateUrl: './tech-page.component.html',
  styleUrls: ['./tech-page.component.scss']
})
export class TechPageComponent {

  tech: TechnologyType | undefined;
  
  techId: string = '';
  techSubscription: Subscription | undefined;
  techIdSubscription: Subscription | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private techService: TechService,
    ) {
    this.techSubscription = this.route.data.subscribe(data => {
      this.tech = data['data']
    });
    this.techIdSubscription = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.techId = idParam ? idParam : ''
    })
  }
}
