import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';
import { TechnologyType } from './types/technologies';
import { TechService } from './service/tech.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
})
export class TechnologiesComponent implements OnInit {
  isFormVisible = false;
  technologies$ = this.store.select(selectTechnologies);
  modalWith: string = '1034';
  modalHeight: string = '600px';
  modalTitle: string = 'Technology';
  filteredTechs: any = [];

  constructor(
    private store: Store,
    private techsService: TechService,
    private alertMessages: AlertsService
  ) {}

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'NºCourses' },
    { prop: 'description', title: 'Description' },
  ];

  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Image', prop: 'imagePath' },
    { label: 'Description', prop: 'description' },
    { label: 'Courses', prop: 'courses' },
  ];

  searchTechsControl = new FormControl('');

  ngOnInit(): void {
    this.technologies$.subscribe((tech) => {
      this.filteredTechs = this.filterTech(
        tech,
        this.searchTechsControl.value || ''
      );
    });
    this.searchTechsControl.valueChanges.subscribe((input) => {
      this.technologies$.subscribe((courses) => {
        this.filteredTechs = this.filterTech(courses, input || '');
      });
    });
  }

  filterTech(array: readonly TechnologyType[], input: string) {
    return array.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
  }

  getTechs() {
    if (this.filteredTechs.length > 0) {
      console.log(this.filteredTechs);
      return this.filteredTechs;
    } else {
      return this.technologies$;
    }
  }

  onToggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onEdit(element: TechnologyType) {
    this.techsService
      .updateTechnology(element.id!, element)
      .then((data) => {
        this.alertMessages.successMessage('Technology update successfully');
      })
      .catch((error) => {
        this.alertMessages.errorMessage(
          'Error updating technology',
          error.message
        );
      });
  }

  async onDelete(id: string) {
    const tech = this.techsService.getTechnologyById(id);
    if ((await tech).courses.length == 0) {
      this.techsService.deleteTechDoc(id);
      this.alertMessages.successMessage('Technology delete successfully');
    } else {
      this.alertMessages.errorMessage("You can't delete it, contains courses");
    }
  }
}
