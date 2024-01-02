import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { TechnologyType } from '../../admins-dashboard/pages/technologies/types/technologies';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DetailModalComponent } from 'src/app/shared/components/modals/detail-modal/detail-modal.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, OnDestroy{
  @Input() displayedColumns: any[] = [];
  @Input() data: any | null = [];
  @Input() rows: any[] = [];
  @Output() onModal: EventEmitter<any> = new EventEmitter();
  @Output() onEdit:  EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() modalWith : string = '' ;
  @Input() modalHeight: string = '';
  @Input() modalTitle: string = '';

  dataSubscription: Subscription | undefined
  dataSource = []
  columns = this.displayedColumns.map(column => column.prop);

  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.dataSubscription = this.data?.subscribe((data: any) => {this.dataSource = data} )
    this.columns = this.displayedColumns.map(column => column.prop);
  
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  handleModal(element: any) {      
     const onEdit = (element:any) =>{   
    this.onEdit.emit(element)
   }
   const onDelete = (element:any) =>{
    this.onDelete.emit(element.id)
   }
  this.dialog.open(DetailModalComponent, {
   
    width:this.modalWith,
    height: this.modalHeight,
    data: 
    {
      data: element,
      title: this.modalTitle,   
      rows: this.rows,    
      ...(element && element.courses && { totalCourses: element.courses.length }),     
      onEdit:onEdit,
      onDelete:onDelete,    
    }
   });   
  }

  getRatingAverage(ratings: any[]): number {
    const sum = ratings.reduce((total, item) => total + item.rating, 0);
    const average = sum / ratings.length;
    const roundedAverage = Math.round(average);

    return roundedAverage;
}

}
