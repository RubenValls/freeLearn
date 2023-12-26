import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TechService } from '../../service/tech.service';
import { TechnologyType } from '../../types/technologies';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-new-tech-form',
  templateUrl: './new-tech-form.component.html',
  styleUrls: ['./new-tech-form.component.scss'],
})
export class NewTechFormComponent {
  constructor(
    private techService: TechService,
    private alertMessages: AlertsService
  ) {}

  newTechForm = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    courses: new FormControl([]),
  });

  onSubmit() {
    if (this.newTechForm.valid) {
      const newTech: TechnologyType = {
        name: this.newTechForm.value.name || '',
        imagePath: this.newTechForm.value.imagePath || '',
        description: this.newTechForm.value.description || '',
        courses: this.newTechForm.value.courses || [],
      };

      this.techService.addTechnology(newTech).then(() => {
        this.alertMessages.successMessage('Technology created successfully');
        this.newTechForm.reset();
      });
    }
  }
}
