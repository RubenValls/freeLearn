import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TechnologyType } from '../../admins-dashboard/pages/technologies/types/technologies';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit{
  @Input() displayedColumns: any[] = [];
  @Input() data: any | null = [];
  @Input() rows: any[] = [];
 


  dataSource = []
  columns = this.displayedColumns.map(column => column.prop);

  constructor(
    
  ) { }

  ngOnInit(): void {
    this.data?.subscribe((data: any) => this.dataSource = data)
    this.columns = this.displayedColumns.map(column => column.prop);
  }


  

  handleEdit(element: any) {
    
  }


  handleDetail(element: any) { 


  }

  handleDelete(element: any) {
      
  }
}
