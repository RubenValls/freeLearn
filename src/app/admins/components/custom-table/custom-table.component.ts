import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent {
  @Input() displayedColumns: any[] = [];
  @Input() data: any[] = [];
  @Input() rows: any[] = [];
 


  dataSource = this.data;
  columns = this.displayedColumns.map(column => column.prop);

  constructor(
    
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = [...this.data];
    this.columns = this.displayedColumns.map(column => column.prop);

  }

  

  handleEdit(element: any) {
    
  }


  handleDetail(element: any) { 


  }

  handleDelete(element: any) {
      
  }
}
