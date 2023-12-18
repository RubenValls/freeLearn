import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TechService } from '../../service/tech.service';

@Component({
  selector: 'app-new-tech-form',
  templateUrl: './new-tech-form.component.html',
  styleUrls: ['./new-tech-form.component.scss']
})
export class NewTechFormComponent {

  constructor( private techService : TechService ) {}

  newTechForm = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    courses: new FormControl([])
  });

  onSubmit() {
    this.techService.addTechnology(this.newTechForm.value);
  }
}
