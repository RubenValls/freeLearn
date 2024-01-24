import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';
import { TechnologyType } from './types/technologies';
import { TechService } from './service/tech.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs';

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

  pageSize: number = 10;
  currentPage: number = 0;
  totalItems: number = 100;

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
      this.totalItems = tech.length

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
    let startIndex = this.currentPage * this.pageSize;
    let endIndex = startIndex + this.pageSize;
    
    if (this.filteredTechs.length > 0) {
      console.log(this.filteredTechs.slice(startIndex, endIndex));
      return this.filteredTechs.slice(startIndex, endIndex);
    } else {
      return this.technologies$.pipe(
        map(tech => tech.slice(startIndex, endIndex))
      );
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

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getTechs();
  }
}
