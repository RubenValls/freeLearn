import { Component } from '@angular/core';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
  isFormVisible = false

  tableData = [
    { name: 'John', age: 25, city: 'New York' },
    { name: 'Jane', age: 30, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' },
  ];

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'age', title: 'Age' },
    { prop: 'city', title: 'City' }
  ];
  onToggleForm(){
    this.isFormVisible = !this.isFormVisible
  }
}
